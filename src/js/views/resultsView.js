import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    'По вашему запросу не найдено рецептов! Пожалуйста попробуйте еще раз ;)';
  _message = '';
   _generateMarkup() {
     return this._data
       .map(result => previewView.render(result, false))
       .join('');
   }
}
export default new ResultsView();
