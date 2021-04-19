const form = document.getElementById('gameForm');
let u = "https://prog30025-game-seek-api.herokuapp.com/api/games"

form.addEventListener("submit", addNewGame);

async function addNewGame(e) {
    e.preventDefault();
    const form = e.currentTarget
    const url = form.action

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });
        console.log({ responseData })
        window.location.replace("./GameList.html")

    } catch (error) {
        console.error(error);
    }
}

async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString)
    const fetchOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: formDataJsonString
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

