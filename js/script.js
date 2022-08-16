let APIKEY = "KwdXApwWyTvuCzYrgdusORWNcrCIbSzB";

document.addEventListener("DOMContentLoaded", init); 

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault()
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
        let str = document.getElementById("search").value;
        url = url.concat(str);

        fetch(url)
        .then(response => response.json())
        .then(content => {
            let fig = document.createElement('figure');
            let img = document.createElement('img');
            img.src = content.data[0].images.fixed_width.url;
            fig.appendChild(img);
            let gif_box = document.querySelector('#gif_box')
            gif_box.insertAdjacentElement('afterbegin', fig)
        })
        .catch(err => {
            console.error(err);
        })
    })
}

//let favorites = JSON.parse(window.localStorage.getItem('favorites'))
if (window.localStorage.getItem('favorites') === null) {
    window.localStorage.setItem('favorites', '[]')
    window.location.reload() }
  else {
    var favorites = JSON.parse(window.localStorage.getItem('favorites'))
    loadGifs()
}

loadGifs()

// Clicar na imagem e adicionar aos favoritos
document.querySelector('#gif_box').onclick = function(event) {
  const imageSource = event.target.src

  if (favorites.indexOf(imageSource) == -1 && event.target.tagName == 'IMG') {
    favorites.push(imageSource)
    alert("Você adicionou aos favoritos")
    window.localStorage.setItem('favorites', JSON.stringify(favorites))

    loadGifs()
  }
}

// Clicar na imagem dos favoritos e excluir
document.querySelector('#favorites_box').onclick = function(event) {
  const imagemFonte = event.target.src;
  
  if (favorites.indexOf(imagemFonte) !== -1 && event.target.tagName == 'IMG') {
    const index = favorites.indexOf(imagemFonte)

    favorites.splice(index, 1)
    alert("Você removeu dos favoritos")
    localStorage.setItem('favorites', JSON.stringify(favorites))

    loadGifs()
  }
}

// Quando clicar em "Inverter" inverte Gifs
document.querySelector('#reverse__favs').onclick = function () {
	reverseFavorites();
}

function loadGifs() {
  let favorites = JSON.parse(window.localStorage.getItem('favorites'))
  document.querySelector('#favorites_box').innerHTML = '';

  favorites.map((t) => {
    var img = document.createElement("img");
    img.src = t;
    document.querySelector('#favorites_box').appendChild(img);
  })
}

// Função para reverter Gifs
function reverseFavorites() {
	let favorites = JSON.parse(window.localStorage.getItem('favorites'))
  let favoritesReverse = favorites.reverse();
  document.querySelector('#favorites_box').innerHTML = '';
  
  favoritesReverse.map((t) => {
    var img = document.createElement("img");
    img.src = t;
    document.querySelector('#favorites_box').appendChild(img);
  })

  //localStorage.setItem('favorites',JSON.stringify( favoritesReverse))
}