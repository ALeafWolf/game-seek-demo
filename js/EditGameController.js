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
}

document.body.onload = getGame(localStorage.getItem('title'))
