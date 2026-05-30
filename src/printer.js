import { Printer } from "@node-escpos/core";
import USB from "@node-escpos/usb-adapter";

export async function getPrinter(vendorId = 0x4b8, productId = 0x0202) {
    const device = new USB(vendorId, productId);

    return new Promise((resolve, reject) => {
        device.open((err) => {
            if (err) return reject(err);

            const options = { encoding: "GB18030" };
            const printer = new Printer(device, options);
            resolve(printer);
        });
    });
}

// for cron jobs
export async function withPrinter(task) {
    const printer = await getPrinter();
    try {
        await task(printer);
    } finally {
        closePrinter(printer);
    }
}

export function closePrinter(printer) {
    printer.close();
}
