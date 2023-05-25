/**
 * @jest-environment jsdom
 */

import commentCounter from '../modules/commentsCounter.js';

describe('Test for comments', () => {
  test('Should available comments', () => {
    // Arrange
    document.body.innerHTML = `
       <div class="comment-section">
         <h3 class="comment-counter"></h3>
         <ul class="comments"></ul>
       </div>
     `;

    // Act
    const commentCount = commentCounter();

    // Assert
    expect(commentCount).toBe(0);
  });
});
