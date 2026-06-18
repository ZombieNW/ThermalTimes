const QUOTE_URL = "https://motivational-spark-api.vercel.app/api/quotes/random";

export async function execute(printer) {
    const quote = await getQuote();

    printer.font("a");
    printer.align("ct");
    printer.style("b");
    printer.size(1, 1);

    printer.text("Quote of the Day");
    printer.text("----------------------------------------");
    printer.text(quote.quote);
    printer.align("rt");
    printer.text("-" + quote.author);
    printer.align("ct");
    printer.text("----------------------------------------");
    printer.feed(2);
}

async function getQuote() {
    const response = await fetch(QUOTE_URL);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Quote API Error: ${errorData.message}`);
    }
    return await response.json();
}
