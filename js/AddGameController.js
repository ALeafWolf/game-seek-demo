const form = document.getElementById('gameForm');
let u = "https://prog30025-game-seek-api.herokuapp.com/api/games"

form.addEventListener("submit", addNewGame);

async function addNewGame(e) {
    e.preventDefault();
    const form = e.currentTarget
    const url = form.action

    try {
        const formData = new FormData(form);
        // const plainFormData = Object.fromEntries(formData.entries());
        // const formDataJsonString = JSON.stringify(plainFormData);
        const responseData = await postFormDataAsJson({ url, formData });
        console.log({ responseData })
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


const test = () => {
    const request = new Request(
        'http://localhost:8080/api/games',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body: '{"title": "Tears of Themis"}'
        }
    )
    fetch(request).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Something went wrong on api server!');
        }
    })
        .then(response => {
            console.debug(response);
            // ...
        }).catch(error => {
            console.error(error);
        });
}

document.getElementById("cancelBtn").onclick = test
