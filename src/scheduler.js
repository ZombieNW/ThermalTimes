import cron from "node-cron";
import { withPrinter } from "./printer.js";
import { printWeatherForecast } from "./feeds/weather.js";

let activeWeatherTask = null;

const runWeatherJob = () => {
    withPrinter(async (printer) => {
        await printWeatherForecast(printer, "85302");
        printer.cut();
    });
};

export const updateWeatherSchedule = (cronExpression) => {
    if (!cron.validate(cronExpression)) {
        return false;
    }

    if (activeWeatherTask) {
        activeWeatherTask.stop();
        console.log("Stopped previous cron schedule.");
    }

    activeWeatherTask = cron.schedule(cronExpression, runWeatherJob);
    console.log(`New weather job scheduled for: "${cronExpression}"`);

    return true;
};
