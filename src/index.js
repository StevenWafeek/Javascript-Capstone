import './style.css';

const apiUrl = 'https://api.tvmaze.com/shows';
const movieCardsContainer = document.getElementById('movie-cards');

async function fetchMovieData(showId) {
  const response = await fetch(`${apiUrl}/${showId}`);
  const data = await response.json();
  return {
    name: data.name,
    image: data.image.medium,
    summary: data.summary,
    genres: data.genres,
  };
}

function createMovieCard(movieData) {
  const card = document.createElement('div');
  card.classList.add('movie-card');

  const title = document.createElement('h2');
  title.innerText = movieData.name;

  const image = document.createElement('img');
  image.src = movieData.image;
  const comment = document.createElement('button');
  comment.innerHTML = 'Comment';

  const genres = document.createElement('p');
  genres.innerHTML = `<strong>Genres:</strong> ${movieData.genres.join(', ')}`;

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(genres);
  card.appendChild(comment);
  return card;
}

async function createMovieCards() {
  const response = await fetch(`${apiUrl}`);
  const showData = await response.json();
  const shows = showData.slice(0, 20);

  // Create movie cards for each TV show
  shows.forEach(async (show) => {
    const movieData = await fetchMovieData(show.id);
    const movieCard = createMovieCard(movieData);
    movieCardsContainer.appendChild(movieCard);
  });
}

createMovieCards();