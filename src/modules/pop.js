const callPop = (movieData) => {
  const popData = document.querySelector('.pop');
  const body = document.querySelector('body');
  popData.innerHTML = `<div class="popHTML"> <button class="closed">X</button> <br/> Name: ${movieData.name} <img class="popup-img" src=${movieData.image} alt="">Credentials: ${movieData.genres}</div>`;
  window.scrollTo(0, 0);
  body.style.overflow = 'hidden';
  const button = document.querySelector('.closed');
  button.addEventListener('click', () => {
    popData.style.display = 'none';
    body.style.overflow = 'visible';
  });
};

export default callPop;