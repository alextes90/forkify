import View from './View.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup(data) {
    return data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(e) {
    const id = window.location.hash.slice(1);
    return ` <li class="preview">
        <a class="preview__link ${
          id === e.id ? 'preview__link--active' : ''
        }" href="#${e.id}">
        <figure class="preview__fig">
        <img src="${e.image}" alt="${e.title}" />
       </figure>
         <div class="preview__data">
     <h4 class="preview__title">${e.title}</h4>
     <p class="preview__publisher">${e.publisher}</p>
      </div>
      </a>
    </li>`;
  }
}

export default new BookmarksView();
