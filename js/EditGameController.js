const getGame = (title) => {
    let url = `https://prog30025-game-seek-api.herokuapp.com/api/games/${title}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayGame(data[0]))
        .catch(err => console.log(err))
}

const displayGame = (game) => {
    let h1 = document.getElementById("pageTitle")
    h1.textContent = localStorage.getItem('title')

    let node = document.getElementById("inputDeveloper")
    node.value = game.developer
    node = document.getElementById("inputPublisher")
    node.value = game.publisher
    node = document.getElementById("inputPlatform")
    node.value = game.platform
    node = document.getElementById("inputRelease")
    node.value = game.release
    node = document.getElementById("inputGenre")
    node.value = game.genre
    node = document.getElementById("inputDescription")
    node.value = game.description
}

async function updateGame(e) {
    e.preventDefault();
    const form = e.currentTarget
    let t = localStorage.getItem('title');
    // const url = `https://prog30025-game-seek-api.herokuapp.com/api/games/${t}`;
    const url = `http://localhost:8080/api/games/${t}`
    console.log(url)
    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });
        console.log({ responseData })
    } catch (error) {
        console.error(error);
    }
    window.location.replace("./GameList.html")
}

async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString)
    const fetchOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: formDataJsonString
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

document.body.onload = getGame(localStorage.getItem('title'))
document.getElementById("gameForm").addEventListener("submit", updateGame)