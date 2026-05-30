import "dotenv/config";

import { withPrinter } from "./printer.js";
import { printWeatherForecast } from "./feeds/weather.js";

withPrinter(async (printer) => {
    await printWeatherForecast(printer, "85302");
    printer.cut();
});
