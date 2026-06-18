const JOKE_URL = "https://v2.jokeapi.dev/joke/Any";

export async function execute(printer) {
    const joke = getJoke();

    printer.font("a");
    printer.align("ct");
    printer.style("b");
    printer.size(1, 1);

    printer.text("Joke of the Day");
    printer.text("--------------------------");
    printer.text(joke);
    printer.text("--------------------------");
    printer.feed(2);
}

async function getJoke() {
    const response = await fetch(JOKE_URL);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Joke API Error: ${errorData.message}`);
    }
    const data = await response.json();

    if (data.type == "twopart") {
        return data.setup + "\n\n" + data.delivery;
    }
    return data.joke ? data.joke : "Joke API Error";
}
