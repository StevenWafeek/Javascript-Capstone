/**
 * @jest-environment jsdom
 */

import commentCounter from '../modules/commentsCounter.js';

describe('Test number of comments', () => {
  test('Should expect zero when there are no comments', () => {
    // Arrange
    document.body.innerHTML = `
       <div>
       <h3 class="commented">Comments:</h3>
         <div><p class="comments-section"></p></div>
       </div>
     `;

    // Act
    const commentCount = commentCounter();

    // Assert
    expect(commentCount).toBe(0);
  });
});
