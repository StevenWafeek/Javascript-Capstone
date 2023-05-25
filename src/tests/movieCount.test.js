import updateMovieCardCount from '../modules/movieCount.js';

describe('updateMovieCardCount', () => {
  test('should update the movie card count', () => {
    const movieCardCount = document.createElement('span');
    movieCardCount.id = 'span';
    document.body.appendChild(movieCardCount);

    updateMovieCardCount(5);

    expect(movieCardCount.textContent).toEqual('5');

    document.body.removeChild(movieCardCount);
  });
});