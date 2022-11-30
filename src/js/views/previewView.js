import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PreviewView extends View {
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

export default new PreviewView();
