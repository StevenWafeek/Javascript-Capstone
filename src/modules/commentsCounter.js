const commentCounter = () => {
  const comments = document.querySelectorAll('.putComments');
  // return comments.length;
  if (!comments.length) {
    return 0;
  }
  return comments.length;
};
export default commentCounter;
