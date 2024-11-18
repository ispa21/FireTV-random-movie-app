const apiKey = '4c485ac9edb349e73d0fcd0cf778b905'; // Replace with your TMDB API Key
const apiBaseURL = 'https://api.themoviedb.org/3';

document.getElementById('randomizeAll').addEventListener('click', () => {
    const source = document.getElementById('source').value;
    getRandomMovie(source, 'all');
});

document.getElementById('topMovies').addEventListener('click', () => {
    const source = document.getElementById('source').value;
    getRandomMovie(source, 'top');
});

async function getRandomMovie(source, type) {
    let url = `${apiBaseURL}/discover/movie?api_key=${apiKey}&language=en-US`;

    // Set region based on source
    if (source === 'bollywood') {
        url += '&region=IN&with_original_language=hi';  // Bollywood region/language
    } else if (source === 'hollywood') {
        url += '&region=US&with_original_language=en';  // Hollywood region/language
    }

    // Fetch top movies based on type
    if (type === 'top') {
        url = `${apiBaseURL}/movie/popular?api_key=${apiKey}&language=en-US`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;

        if (movies.length > 0) {
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            displayMovie(randomMovie);
        } else {
            document.getElementById('movieDisplay').innerText = 'No movies found for selected filters!';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        document.getElementById('movieDisplay').innerText = 'Error fetching movies!';
    }
}

function displayMovie(movie) {
    const movieDisplay = document.getElementById('movieDisplay');
    movieDisplay.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <button onclick="watchMovie('${movie.id}')">Watch Now</button>
    `;
}

function watchMovie(movieId) {
    // Redirect to a streaming service or display a prompt if the movie is available.
    alert("Redirecting to the streaming service...");

    // Placeholder action: implement actual URL redirection logic here.
    // This could be a link to a streaming service if you have access to movie URLs.
}
