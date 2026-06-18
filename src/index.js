import "dotenv/config";
import cron from "node-cron";
import { withPrinter } from "./printer.js";

import * as weatherPlugin from "./plugins/weather.js";
const plugins = [weatherPlugin];

async function runMorningRoutine() {
    console.log("Starting morning print routine...");

    await withPrinter(async (printer) => {
        for (const plugin of plugins) {
            await plugin.execute(printer);
        }
        printer.cut();
    });

    console.log("Morning routine complete.");
}

cron.schedule("0 5 * * *", runMorningRoutine);
console.log("ThermalTimes started. Scheduled for 5:00 AM daily.");
