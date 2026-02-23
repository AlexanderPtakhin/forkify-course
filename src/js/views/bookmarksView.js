import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage =
    'Закладок пока нет. Найдите хороший рецепт и добавьте его в закладки ;)';
  _message = '';

addHandlerRender(handler){
  window.addEventListener('load', handler)
}

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
