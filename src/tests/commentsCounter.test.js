/**
 * @jest-environment jsdom
 */

import commentCounter from '../modules/commentsCounter.js';

describe('commentCounter', () => {
  test('should return 0 when there are no comments', () => {
    document.body.innerHTML = '';
    const count = commentCounter();

    expect(count).toBe(0);
  });

  test('should return the number of comments when there are comments', () => {
    // Arrange
    const comment1 = document.createElement('div');
    comment1.classList.add('putComments');
    const comment2 = document.createElement('div');
    comment2.classList.add('putComments');
    document.body.appendChild(comment1);
    document.body.appendChild(comment2);

    // Act
    const count = commentCounter();

    // Assert
    expect(count).toBe(2);

    // Clean up
    document.body.removeChild(comment1);
    document.body.removeChild(comment2);
  });
});