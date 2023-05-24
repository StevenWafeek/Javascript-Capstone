// const callPop = (movieData) => {
//   const popData = document.querySelector('.pop');
//   const body = document.querySelector('body');

//   // Retrieve comments for this movie from local storage
//   const commentsKey = `comments-${movieData.name}`;
//   const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

//   // Create the HTML for the pop-up with comments section and add comment button
//   const commentsHTML = comments.map((comment) => `<p>${comment}</p>`).join('');
//   const popHTML = `<div class="popHTML">
//     <button class="closed">X</button>
//     <br/> Name: ${movieData.name} 
//     <img class="popup-img" src=${movieData.image} alt="">Credentials: ${movieData.genres}
//     <br/><br/><h3>Comments</h3>
//     <div class="comments-section">${commentsHTML}</div>
//     <br/><button class="add-comment-btn">Add Comment</button>
//   </div>`;
//   popData.innerHTML = popHTML;

//   // Disable scrolling on the body
//   body.style.overflow = 'hidden';

//   // Add event listener to close button
//   const closeButton = document.querySelector('.closed');
//   closeButton.addEventListener('click', () => {
//     popData.style.display = 'none';
//     body.style.overflow = 'visible';
//   });

//   // Add event listener to add comment button
//   const addCommentButton = document.querySelector('.add-comment-btn');
//   addCommentButton.addEventListener('click', () => {
//   // Check if input fields and submit button have already been added
//     const inputsExist = document.querySelector('.comments-section input[type="text"]');
//     const submitButtonExists = document.querySelector('.comments-section .submit-comment-btn');
//     if (!inputsExist && !submitButtonExists) {
//     // Create input and submit button for adding a comment
//       const inputHTML = '<input type="text" placeholder="Enter your comment">';
//       const nametHTML = '<input type="text" placeholder="Enter your name">';
//       const submitHTML = '<button class="submit-comment-btn">Submit</button>';

//       // Add input and submit button to comments section
//       const commentsSection = document.querySelector('.comments-section');
//       commentsSection.insertAdjacentHTML('beforeend', nametHTML);
//       commentsSection.insertAdjacentHTML('beforeend', inputHTML);
//       commentsSection.insertAdjacentHTML('beforeend', submitHTML);

//       // Focus on the input field
//       const inputField = document.querySelector('input[type="text"]:nth-of-type(2)');
//       inputField.focus();

//       // Add event listener to submit button
//       const submitButton = document.querySelector('.submit-comment-btn');
//       submitButton.addEventListener('click', () => {
//         const name = document.querySelector('input[type="text"]:first-of-type').value.trim();
//         const comment = inputField.value.trim();

//         if (comment !== '') {
//         // Add comment to local storage for this movie
//           const commentsKey = 'movie-comments';
//           const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
//           // Add the new comment object to the comments array
//           comments.push({ name, comment });
//           localStorage.setItem(commentsKey, JSON.stringify(comments));

//           // Display the new comment
//           const newCommentHTML = `<p><strong>${name}: </strong>${comment}</p>`;
//           commentsSection.insertAdjacentHTML('beforeend', newCommentHTML);

//           // Clear the input fields
//           document.querySelector('input[type="text"]:first-of-type').value = '';
//           inputField.value = '';
//         }
//       });
//     }
//   });
// };

// export default callPop;


const callPop = async (movieData) => {
  const popData = document.querySelector('.pop');
  const body = document.querySelector('body');

  // Retrieve comments for this movie from the API
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EggSGBLacbxyGumZrK3e/comments/');
  const comments = await response.json();
  console.log(comments)

  // Filter comments for this movie
  const filteredComments = comments.filter((comment) => comment.item_id === movieData.id);

  // Create the HTML for the pop-up with comments section and add comment button
  const commentsHTML = filteredComments.map((comment) => `<p><strong>${comment.username}: </strong>${comment.comment}</p>`).join('');
  const popHTML = `<div class="popHTML">
    <button class="closed">X</button>
    <br/> Name: ${movieData.name} 
    <img class="popup-img" src=${movieData.image} alt="">Credentials: ${movieData.genres}
    <br/><br/><h3>Comments</h3>
    <div class="comments-section">${commentsHTML}</div>
    <br/><button class="add-comment-btn">Add Comment</button>
  </div>`;
  popData.innerHTML = popHTML;

  // Disable scrollingon the body
  body.style.overflow = 'hidden';

  // Add event listener to close button
  const closeButton = document.querySelector('.closed');
  closeButton.addEventListener('click', () => {
    popData.style.display = 'none';
    body.style.overflow = 'visible';
  });

  // Add event listener to add comment button
  const addCommentButton = document.querySelector('.add-comment-btn');
  addCommentButton.addEventListener('click', () => {
  // Check if input fields and submit button have already been added
    const inputsExist = document.querySelector('.comments-section input[type="text"]');
    const submitButtonExists = document.querySelector('.comments-section .submit-comment-btn');
    if (!inputsExist && !submitButtonExists) {
    // Create input and submit button for adding a comment
      const inputHTML = '<input type="text" placeholder="Enter your comment">';
      const nametHTML = '<input type="text" placeholder="Enter your name">';
      const submitHTML = '<button class="submit-comment-btn">Submit</button>';

      // Add input and submit button to comments section
      const commentsSection = document.querySelector('.comments-section');
      commentsSection.insertAdjacentHTML('beforeend', nametHTML);
      commentsSection.insertAdjacentHTML('beforeend', inputHTML);
      commentsSection.insertAdjacentHTML('beforeend', submitHTML);

      // Focus on the input field
      const inputField = document.querySelector('input[type="text"]:nth-of-type(2)');
      inputField.focus();

      // Add event listener to submit button
      const submitButton = document.querySelector('.submit-comment-btn');
      submitButton.addEventListener('click', async () => {
        const name = document.querySelector('input[type="text"]:first-of-type').value.trim();
        const comment = inputField.value.trim();

        if (comment !== '') {
          // Add comment to the API for this movie
          const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ikO6dEXAJIulpkvV4Csx/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id: movieData.id, username: name, comment }),
          });
          const newComment = await response.json();

          // Display the new comment
          const newCommentHTML = `<p><strong>${newComment.username}: </strong>${newComment.comment}</p>`;
          commentsSection.insertAdjacentHTML('beforeend', newCommentHTML);

          // Clear the input fields
          document.querySelector('input[type="text"]:first-of-type').value = '';
          inputField.value = '';
        }
      });
    }
  });
};

export default callPop;