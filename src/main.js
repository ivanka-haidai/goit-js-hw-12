import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const inputEl = formEl.elements['search-text'];
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();
  clearGallery();
  hideLoadMoreButton();
  currentPage = 1;

  currentQuery = inputEl.value.trim();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  await fetchImages();
}

async function onLoadMore() {
  currentPage++;
  await fetchImages(true);
}

async function fetchImages(isLoadMore = false) {
  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage, perPage);
    totalHits = response.totalHits;

    if (response.hits.length === 0 && !isLoadMore) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try another search term!',
        position: 'topRight',
      });
      return;
    }

    createGallery(response.hits);

    const totalPages = Math.ceil(totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    
    if (isLoadMore) {
      smoothScroll();
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}