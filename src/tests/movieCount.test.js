// import updateMovieCardCount from './movieCount.js';

import updateMovieCardCount from '../modules/movieCount.js';

describe('updateMovieCardCount', () => {
  test('should update the movie card count', () => {
    // Set up the test by creating a new element and appending it to the document
    const movieCardCount = document.createElement('span');
    movieCardCount.id = 'span';
    document.body.appendChild(movieCardCount);

    // Call the function with a count of 5
    updateMovieCardCount(5);

    // Assert that the text content of the element is '5'
    expect(movieCardCount.textContent).toEqual('5');

    // Clean up the test by removing the element from the document
    document.body.removeChild(movieCardCount);
  });
});