import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Number of pages between buttons
    const numOfPagesPag = function () {
      let result = '';
      for (let i = 1; i <= numOfPages; i++) {
        result += `<button data-goto="${i}" class="pages-pagination">${i}</button>`;
      }
      return result;
    };

    //Page 1, and there are other pages
    if (currentPage === 1 && numOfPages > 1) {
      return `${numOfPagesPag()}`;
    }
    //Page 1, and there are No other pages
    if (numOfPages === 1) {
      return ``;
    }
    //Last page
    if (currentPage === numOfPages) {
      return `${numOfPagesPag()}`;
    }
    //Other page

    if (currentPage < numOfPages)
      return `${this._generateMarkupPrev(
        currentPage
      )}${numOfPagesPag()}${this._generateMarkupNext(currentPage)}`;
  }

  _generateMarkupNext(e) {
    return `<button data-goto="${
      e + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${e + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }

  _generateMarkupPrev(e) {
    return `<button data-goto="${
      e - 1
    }" class="btn--inline pagination__btn--prev">
<svg class="search__icon">
  <use href="${icons}#icon-arrow-left"></use>
</svg>
<span>Page ${e - 1}</span>
</button>`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  addHandlerClickPag(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.pages-pagination');
      if (!btn) return;
      console.log('click');

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
}

export default new paginationView();
