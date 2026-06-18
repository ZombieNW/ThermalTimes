export async function execute(printer) {
    printer.font("a");
    printer.align("ct");
    printer.style("b");
    printer.size(1, 1);

    printer.text("Hacker News");
    printer.text("----------------------------------------");

    try {
        const articles = await fetchHackerNews();

        printer.align("lt");
        articles.forEach((article, index) => {
            printer.style("b");
            printer.text(`${index + 1}. ${article.title}`);
        });
    } catch (error) {
        printer.align("ct");
        printer.text("Error fetching Hacker News.");
    }
    printer.feed(2);
}

async function fetchHackerNews() {
    const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
    );
    if (!response.ok) throw new Error();

    const storyIds = await response.json();
    const storyPromises = storyIds.slice(0, 3).map(async (id) => {
        const itemResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        );
        return itemResponse.json();
    });

    return Promise.all(storyPromises);
}
