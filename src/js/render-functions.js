import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loaderElem = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.loadMoreBtn');

let lightbox;

function createGallery(images) {
  const markup = images
  .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img 
            class="gallery-image" 
            src="${webformatURL}" 
            alt="${tags}" 
          />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>`;
  })
  .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}


function clearGallery() {
  galleryEl.innerHTML = '';
}



function showLoader() {
  loaderElem.classList.add('is-active');
}

function hideLoader() {
  loaderElem.classList.remove('is-active');
}

function showLoadMoreButton() {
  loadMoreBtnEl.classList.remove('hidden');
}

function hideLoadMoreButton() {
  loadMoreBtnEl.classList.add('hidden');
}

export { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton };