export async function execute(printer) {
    const forecastData = await fetchForecastByZip("85302");

    const today = new Date().toISOString().split("T")[0];
    const todayForecasts = forecastData.list.filter((item) =>
        item.dt_txt.startsWith(today),
    );

    const temps = todayForecasts.map((i) => i.main.temp);
    const tempMin = Math.round(Math.min(...temps));
    const tempMax = Math.round(Math.max(...temps));
    const city = forecastData.city.name;
    const desc = todayForecasts[0].weather[0].description;

    printer.font("a");
    printer.align("ct");
    printer.style("b");
    printer.size(1, 1);

    printer.text(`Weather Forecast: ${city}`);
    printer.text("----------------------------------------");
    printer.size(2, 2);
    printer.text(`${tempMin}F - ${tempMax}F`);
    printer.size(1, 1);
    printer.text("Today's Range");
    printer.text("----------------------------------------");
    printer.text(desc.toUpperCase());
    printer.text("----------------------------------------");
    printer.feed(2);
}

async function fetchForecastByZip(zipCode) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Weather API Error: ${errorData.message}`);
    }
    return await response.json();
}
