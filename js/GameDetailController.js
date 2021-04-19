const getGame = (title) => {
    let url = `https://prog30025-game-seek-api.herokuapp.com/api/games/${title}`; 
    fetch(url)
        .then(response => response.json())
        .then(data => displayGame(data[0]))
        .catch(err => console.log(err))
}

const displayGame = (game) => {
    let editBtn = document.getElementsByClassName('btnEdit')[0];
    editBtn.id = game.title

    document.getElementById('pageTitle').textContent = game.title
    console.log(editBtn)
    let tbody = document.getElementById('gameInfo')
    let ths = ["Developer", "Publisher", "Platform", "Release Date", "Gerne", "Description"]
    let tds = [game.developer, game.publisher, game.platform, game.release, game.genre, game.description]
    for(let i = 0; i < 6; i++){
        let tr = document.createElement('tr');
        let th = document.createElement('th')
        th.textContent = ths[i]
        let td = document.createElement('td')
        td.textContent = tds[i]
        tr.append(th)
        tr.append(td)
        tbody.append(tr)
    }
}

const toEditPage = function(){
    localStorage.setItem("title", this.id)
    location.href = './EditGame.html'
}

document.body.onload = getGame(localStorage.getItem('title'))
document