const getGames = () => {
    let url = `https://prog30025-game-seek-api.herokuapp.com/api/games`
    fetch(url)
        .then(response => response.json())
        .then(data => listGames(data))
        .catch(err => console.log(err))
}

const listGames = (data) => {
    let tbody = document.getElementById('gameRows');
    data.forEach(game => {
        let tr = document.createElement('tr')
        let a = []
        a.push(game.title)
        a.push(game.publisher)
        a.push(game.developer)
        a.push(game.platform)
        a.push(game.releasy)
        a.push(game.genre)
        let nodes = a.map(input => {
            let td = document.createElement('td')
            td.textContent = input
            return td;
        })
        tr.append(...nodes);
        let btnDetail = document.createElement('input')
        btnDetail.type = "button"
        btnDetail.id = game.title
        btnDetail.value = "Detail"
        btnDetail.onclick = toDetailPage
        // console.log(btnDetail.name)
        tr.append(btnDetail)
        // let btns = `<a href="./GameDetail.html" class="btn btn-primary">Detail</a><br />
        // <a href="./EditGame.html" class="btn btn-primary">Edit</a><br />
        // <a href="#" class="btn btn-danger">Delete</a>`
        // tr.innerHTML += btns
        tbody.append(tr)
    });
}

const toDetailPage = function(){
    localStorage.setItem("title", this.id)
    location.href='./GameDetail.html'
}

document.body.onload = getGames()