import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto } from './js/pixabay-api';
import { createMarkup } from './js/markup';
import { refs } from './js/refs';
import { lightbox } from './js/lightbox';
import { toggleForm } from './js/toggle';

const { searchForm, gallery, btnLoadMore } = refs;

const paramsForNotify = {
  position: 'right-top',
  timeout: 4000,
  width: '400px',
  fontSize: '16px',
};

const perPage = 40;
let page = 1;
let keyOfSearchPhoto = '';

btnLoadMore.classList.add('is-hidden');

searchForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  gallery.innerHTML = '';
  page = 1;
  const { searchQuery } = event.currentTarget.elements;
  keyOfSearchPhoto = searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');
  // console.log(keyOfSearchPhoto);

  if (keyOfSearchPhoto === '') {
    Notify.info('Enter your request, please!', paramsForNotify);
    return;
  }

  fetchPhoto(keyOfSearchPhoto, page, perPage)
    .then(data => {
      const searchResults = data.hits;
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          paramsForNotify
        );
      } else {
        Notify.info(
          `Hooray! We found ${data.totalHits} images.`,
          paramsForNotify
        );
        // console.log(searchResults);
        createMarkup(searchResults);
        lightbox.refresh();
      }
      if (data.totalHits > perPage) {
        btnLoadMore.classList.remove('is-hidden');
        window.addEventListener('scroll', showLoadMorePage);
      }
      // scrollPage();
    })
    .catch(onFetchError);

  btnLoadMore.addEventListener('click', onClickLoadMore);

  event.currentTarget.reset();
}

document.getElementById('intro_btn').onclick = function () {
  document.getElementById('main').classList.add('main--main-bg');
};

function onClickLoadMore() {
  page += 1;
  fetchPhoto(keyOfSearchPhoto, page, perPage)
    .then(data => {
      const searchResults = data.hits;
      const numberOfPage = Math.ceil(data.totalHits / perPage);

      createMarkup(searchResults);
      if (page === numberOfPage) {
        btnLoadMore.classList.add('is-hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results.",
          paramsForNotify
        );
        btnLoadMore.removeEventListener('click', onClickLoadMore);
        window.removeEventListener('scroll', showLoadMorePage);
      }
      lightbox.refresh();
      // scrollPage();
    })
    .catch(onFetchError);
}

function onFetchError() {
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or make another choice!',
    paramsForNotify
  );
}

function showLoadMorePage() {
  if (checkIfEndOfPage()) {
    onClickLoadMore();
  }
}

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
}
