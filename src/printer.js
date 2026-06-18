import { Printer } from "@node-escpos/core";
import USB from "@node-escpos/usb-adapter";

export async function getPrinter(vendorId = 0x4b8, productId = 0x0202) {
    const device = new USB(vendorId, productId);

    return new Promise((resolve, reject) => {
        device.open((err) => {
            if (err) return reject(err);
            resolve(new Printer(device, { encoding: "GB18030" }));
        });
    });
}

export async function withPrinter(task) {
    const printer = await getPrinter();
    try {
        await task(printer);
    } finally {
        printer.close();
    }
}
