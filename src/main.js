import "dotenv/config";

import cron from "node-cron";
import { withPrinter } from "./printer.js";
import { printWeatherForecast } from "./feeds/weather.js";

cron.schedule("0 7 * * *", () => {
    withPrinter(async (printer) => {
        await printWeatherForecast(printer, "85302");
        printer.cut();
    });
});
