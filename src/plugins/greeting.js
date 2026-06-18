export async function execute(printer) {
    printer.font("a");
    printer.align("ct");
    printer.style("b");
    printer.size(1, 1);

    printer.text("========================================");
    printer.size(2, 2);
    printer.text("Good Morning!");
    printer.size(1, 1);
    printer.text(getTodaysDate());
    printer.text("========================================");
    printer.feed(2);
}

function getTodaysDate() {
    const now = new Date();

    const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
        now,
    );
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        now,
    );
    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
        now,
    );

    const getOrdinal = (d) => {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${month} ${day}${getOrdinal(day)}, ${year}`;
}
