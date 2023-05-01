// Variabel
const search = document.querySelector('.search')
const input = document.querySelector('.inputan')
const card = document.querySelector('.movie')

// Event ketika tombol search di klick akan muncul film
search.addEventListener('click', async function () {
  card.innerHTML = `<h1 class="text-center">Loading ... <h1/>`
  const getKey = await menerimaInputan()
  return getKey
})

// Untuk Enter
input.addEventListener('keyup', async function (i) {
  if (i.keyCode === 13) {
    card.innerHTML = `<h1 class="text-center">Loading ... <h1/>`
    const getKey = await menerimaInputan()
    return getKey
  }
})

// Fungsi Untuk menampilkan inputan

function menerimaInputan() {
  return fetch('http://www.omdbapi.com/?apikey=44ac263d&s=' + input.value)
    .then((response) => response.json())
    .then((response) => {
      let keyWord = response.Search
      let cards = ''
      keyWord.forEach((i) => {
        cards += showCard(i)
        card.innerHTML = cards
      })
    })
}

// Event Binding
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-button')) {
    const imdbid = e.target.dataset.imdbid
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = `<h3 class="text-center">Loading ...<h3/>`
    const movieDetail = await getMovieDetail(imdbid)
    updateUI(movieDetail)
  }
})

// Mencari movie
function getMovieDetail(imdbid) {
  return fetch('http://www.omdbapi.com/?apikey=44ac263d&i=' + imdbid)
    .then((response) => response.json())
    .then((response) => response)
}

// Update UI
function updateUI(hasil) {
  const modalBody = document.querySelector('.modal-body')
  const movieDetail = showDetail(hasil)
  modalBody.innerHTML = movieDetail
}

// Fungsi
function showCard(i) {
  return (
    ` <div class="col-md-4 mt-4">
    <div class="card">
      <img src=" ${i.Poster}; " class="card-img-top" style="width:18rem;" />
      <div class="card-body">
        <h5 class="card-title judul">` +
    i.Title +
    `</h5>
        <h6 class="card-subtitle mb-2 text-muted tahun">${i.Year}</h6>
        <button type="button" class="btn btn-primary modal-button " data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${i.imdbID}">See Detail</button>
      </div>
    </div>
  </div>`
  )
}

// Fungsi Menampilkan detail film
function showDetail(hasil) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <img src="${hasil.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h3>${hasil.Title}</h3></li>
          <li class="list-group-item"><strong>Director :</strong>${hasil.Director}</li>
          <li class="list-group-item"><strong>Actors : </strong>${hasil.Actors}</li>
          <li class="list-group-item"><strong>Penulis : </strong>${hasil.Writer}</li>
          <li class="list-group-item"><strong>Genre : </strong>${hasil.Genre}</li>
        </ul>
      </div>
    </div>
  </div>`
}
