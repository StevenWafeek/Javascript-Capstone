import commentCounter from './commentsCounter.js';

const getComments = async (showId) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EK8AqlUP7MtIYG7gJYqn/comments?item_id=${showId}`);
  const data = await response.json();
  return data.error ? [] : data;
};

const callPop = async (movieData) => {
  const popData = document.querySelector('.pop');
  const body = document.querySelector('body');

  // Retrieve comments for this movie from API
  let commentsHTML = 'no comment found';
  const comments = await getComments(movieData.itemId);
  if (comments.length > 0) {
    // Create the HTML for the pop-up with comments section and add comment button
    commentsHTML = comments.map((comment) => `<p class='putComments'>${comment.username}: ${comment.comment}</p>`).join('');
  }
  const popHTML = `<div class="popHTML">
        <button class="closed">X</button>
        <br/> Name: ${movieData.name} 
        <img class="popup-img" src=${movieData.image} alt="">Credentials: ${movieData.genres}
        <br/><br/><h3 class="commented">Comments:</h3>
        <div class="comments-section">${commentsHTML}</div>
        `;
  popData.innerHTML = popHTML;

  // Add event listener to close button
  const closeButton = document.querySelector('.closed');
  closeButton.addEventListener('click', () => {
    popData.style.display = 'none';
    body.style.overflow = 'visible';
  });

  // Check if input fields and submit button have already been added
  const inputsExist = document.querySelector('.comments-section input[type="text"]');
  const submitButtonExists = document.querySelector('.comments-section .submit-comment-btn');
  if (!inputsExist && !submitButtonExists) {
    // Create input and submit button for adding a comment
    const nameHTML = '<input type="text" placeholder="Enter your name">';
    const inputHTML = '<input type="text" placeholder="Enter your comment">';
    const submitHTML = '<button class="submit-comment-btn">Submit</button>';

    // Add input and submit button to comments section
    const commentsSection = document.querySelector('.comments-section');
    commentsSection.insertAdjacentHTML('afterend', submitHTML);
    commentsSection.insertAdjacentHTML('afterend', nameHTML);
    commentsSection.insertAdjacentHTML('afterend', inputHTML);

    // Focus on the input field
    const inputField = document.querySelector('input[type="text"]:nth-of-type(2)');
    inputField.focus();

    // Add event listener to submit button
    const submitButton = document.querySelector('.submit-comment-btn');
    submitButton.addEventListener('click', () => {
      const name = document.querySelector('input[type="text"]:first-of-type').value.trim();
      const comment = inputField.value.trim();

      if (comment !== '') {
        // Add comment to API for this movie
        const requestBody = {
          item_id: movieData.itemId,
          username: name,
          comment,
        };
        fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EK8AqlUP7MtIYG7gJYqn/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        // Display the new comment

        const newCommentHTML = `<p><strong>${name}: </strong>${comment}</p>`;
        commentsSection.insertAdjacentHTML('beforeend', newCommentHTML);
        // Clear the input fields
        document.querySelector('input[type="text"]:first-of-type').value = '';
        inputField.value = '';
      }
    });
  }

  const count = document.querySelector('.commented');
  const counted = commentCounter();
  count.textContent += `${counted}`;
};

export default callPop;