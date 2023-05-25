const popup = document.querySelector('.pop');
const closeBtn = document.querySelector('.close-btn');
const popupImage = document.querySelector('.popup-img');
const popupTitle = document.querySelector('.popup-name');
const popupType = document.querySelector('.popup-type');
const popupLanguage = document.querySelector('.popup-language');

const callPop = (movieData) => {
  const popData = document.querySelector('.pop');
  const body = document.querySelector('body');
  popupImage.src = `${movieData.image}`;
  popupTitle.textContent = `${movieData.name}`;
  // popData.innerHTML = `<div class="popHTML"> <button class="closed">X</button> <br/> Name: ${movieData.name} <img class="popup-img" src=${movieData.image} alt="">Credentials: ${movieData.genres}</div>`;
  window.scrollTo(0, 0);
  // body.style.overflow = 'hidden';
  // const button = document.querySelector('.closed');
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    body.style.overflow = 'visible';
  });
};

export default callPop;