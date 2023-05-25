import { createComment, displayComments, getMovieId, setMovieId } from './modules/comments.js';
import fetchMovieData from './modules/fetchData.js';
import { fetchLikesData, updateLikesData } from './modules/likes.js';
import callPop from './modules/pop.js';


import './style.css';

const movieCardsContainer = document.getElementById('movie-cards');
const pop = document.querySelector('.pop');

const createMovieCard = async (movieData, showId) => {
  const card = document.createElement('div');
  card.classList.add('movie-card');
  card.id = `movie-${showId}`;

  const title = document.createElement('h2');
  title.innerText = movieData.name;

  const image = document.createElement('img');
  image.src = movieData.image;

  const comment = document.createElement('button');
  comment.innerHTML = 'Comment';
  comment.classList.add('comment');

  const likeBtn = document.createElement('button');
  likeBtn.classList.add('likes');
  likeBtn.innerHTML = 'Like';

  const likes = document.createElement('p');
  likes.innerHTML = 'Likes: 0';

  const movieLikes = await fetchLikesData(showId);
  likes.innerHTML = `Likes: ${movieLikes}`;

  likeBtn.addEventListener('click', async () => {
    const currentLikes = parseInt(likes.innerHTML.split(' ')[1], 10);
    const newLikes = currentLikes + 1;
    likes.innerHTML = `Likes: ${newLikes}`;
    await updateLikesData(showId, newLikes);
  });

  const genres = document.createElement('p');
  genres.innerHTML = `<strong>Genres:</strong> ${movieData.genres.join(', ')}`;

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(genres);
  card.appendChild(likeBtn);
  card.appendChild(likes);
  card.appendChild(comment);

  comment.addEventListener('click', () => {
    pop.style.display = 'block';
    setMovieId(movieData);
    callPop(movieData);
    displayComments(getMovieId());
  });

  return card;
};

const createMovieCards = async () => {
  const apiUrl = 'https://api.tvmaze.com/shows';
  const response = await fetch(`${apiUrl}`);
  const showData = await response.json();
  const shows = showData.slice(0, 20);
  shows.forEach(async (show) => {

    const movieData = await fetchMovieData(show.id);
    const movieCard = await createMovieCard(movieData, show.id);
    movieCardsContainer.appendChild(movieCard);
  });


const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  createComment();
});


};


createMovieCards();