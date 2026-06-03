import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { updateWeatherSchedule } from "./scheduler.js";

const app = express();
const PORT = 80;

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve static frontend assets from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set initial default daily 5:00 AM schedule
updateWeatherSchedule("0 5 * * *");

/**
 * POST Endpoint to change the schedule dynamically
 */
app.post("/update-schedule", (req, res) => {
    const { schedule } = req.body;

    if (!schedule) {
        return res.status(400).json({
            success: false,
            message: "Missing 'schedule' property.",
        });
    }

    const wasUpdated = updateWeatherSchedule(schedule);

    if (!wasUpdated) {
        return res.status(400).json({
            success: false,
            message: `Invalid cron expression: "${schedule}"`,
        });
    }

    return res.json({
        success: true,
        message: `Schedule successfully updated to: ${schedule}`,
    });
});

app.listen(PORT, () => {
    console.log(`Local control panel running at http://localhost:${PORT}`);
});
