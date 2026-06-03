document.addEventListener("DOMContentLoaded", () => {
    const presetSelect = document.getElementById("preset");
    const cronInput = document.getElementById("cron");
    const updateBtn = document.getElementById("updateBtn");
    const statusDiv = document.getElementById("status");

    // Update input box when dropdown preset changes
    presetSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        if (value !== "custom") {
            cronInput.value = value;
        }
    });

    // Handle button click submission
    updateBtn.addEventListener("click", async () => {
        const cronValue = cronInput.value.trim();

        try {
            const response = await fetch("/update-schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ schedule: cronValue }),
            });

            const result = await response.json();

            statusDiv.className = result.success ? "success" : "error";
            statusDiv.textContent = result.message;
            statusDiv.style.display = "block";
        } catch (err) {
            statusDiv.className = "error";
            statusDiv.textContent = "Failed to communicate with server.";
            statusDiv.style.display = "block";
        }
    });
});
