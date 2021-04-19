const url = `https://prog30025-game-seek-api.herokuapp.com/api/games/`

const getGames = () => {
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
        a.push(game.release)
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
        btnDetail.className = 'btn btn-primary'
        tr.append(btnDetail)

        let btnEdit = document.createElement('input')
        btnEdit.type = "button"
        btnEdit.id = game.title
        btnEdit.value = "Edit"
        btnEdit.onclick = toEditPage
        btnEdit.className = 'btn btn-primary'
        tr.append(btnEdit)

        let btnDelete = document.createElement('input')
        btnDelete.type = "button"
        btnDelete.id = game.title
        btnDelete.value = "Delete"
        btnDelete.onclick = deleteGame
        btnDelete.className = 'btn btn-danger'
        tr.append(btnDelete)

        tbody.append(tr)
    });
}

const toDetailPage = function () {
    localStorage.setItem("title", this.id)
    location.href = './GameDetail.html'
}

const toEditPage = function () {
    localStorage.setItem("title", this.id)
    location.href = './EditGame.html'
}

const deleteGame = function () {
    let u = url + this.id
    console.log(u)

    const request = new Request(
        u,
        {
            method: 'DELETE'
        }
    )
    fetch(request).then(response => {
        if (response.status === 200) {
            console.log(response);
        } else {
            throw new Error('Something went wrong on api server!');
        }
    }).catch(error => {
        console.error(error);
    });
    location.reload()
}

document.body.onload = getGames()