document.querySelector('#getMovie').addEventListener('click', getRandomMovieAndInfo);

// API keys
const tmdbApiKey = '01b2e6ef831ae0db4c4eb6c6548a7fd6';  // TMDb API Key
const omdbApiKey = '4248b0cd';  // OMDb API Key

// Function to get random movie from TMDb and then query OMDb for additional details
function getRandomMovieAndInfo() {

    // list of popular movies from TMDb
    const tmdbUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`;

    fetch(tmdbUrl)
        .then(response => response.json())
        .then(tmdbData => {
            console.log('TMDb Data:', tmdbData);

            // Randomly select a movie from the popular movies list
            const randomIndex = Math.floor(Math.random() * tmdbData.results.length);
            const randomMovie = tmdbData.results[randomIndex];
            const movieTitle = randomMovie.title;

            // Display basic movie info from TMDb
            document.querySelector('#movieTitle').innerText = `Movie: ${movieTitle}`;
            document.querySelector('#movieDescription').innerText = `${randomMovie.overview}`;
            document.querySelector('#movieRating').innerText = `Rating: ${randomMovie.vote_average}`;
            document.querySelector('#movieReleaseDate').innerText = `Release Date: ${randomMovie.release_date}`;

            const tmdbPosterUrl = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;
            document.querySelector('#moviePoster').src = tmdbPosterUrl;



            //  Use the movie title to get more details from OMDb API (2nd API)
            const omdbUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${omdbApiKey}`;
            return fetch(omdbUrl);
        })
        .then(response => response.json())
        .then(omdbData => {
            console.log('OMDb Data:', omdbData);

            // Display additional movie info from OMDb
            document.querySelector('#movieDirector').innerText = `Director: ${omdbData.Director}`;
            document.querySelector('#movieActors').innerText = `Actors: ${omdbData.Actors}`;
            document.querySelector('#movieAwards').innerText = `Awards: ${omdbData.Awards}`;
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
}





// const apiKey = '01b2e6ef831ae0db4c4eb6c6548a7fd6'; // Replace this with your actual API key
//const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;



// first api key from https://www.omdbapi.com/ 1,000 free daily inputs
//api key1 http://www.omdbapi.com/?i=tt3896198&apikey=4248b0cd


// second api key from `https://api.themoviedb.org/3/movie/popular
// api key2 01b2e6ef831ae0db4c4eb6c6548a7fd6 