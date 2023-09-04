const apiKey = '1835b0bed7900a0678b0d230ba745698';
let years = "2023";
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&year=${years}`;

const dropdown = document.getElementById('years');

const content = document.getElementById('content');
const urlPoster = `https://image.tmdb.org/t/p/w500/`

async function displayMovies(url) {
    const response = await fetch(url);
    const movies = await response.json();
    
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    movies.results.forEach(data=>{
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        const title = document.createElement('h2');
        const poster = document.createElement('img');
        title.innerHTML = `${data.title.substring(0,24)}`;
        poster.src = `${urlPoster}${data.poster_path}`;
        movieEl.appendChild(title);
        movieEl.appendChild(poster);
        content.appendChild(movieEl);
    })
}


dropdown.addEventListener('change', ()=> {
    years = dropdown.value
    const updateUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&year=${years}`;
    displayMovies(updateUrl);
})

displayMovies(url);