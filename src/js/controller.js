import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultPage());
    //обновление закладок
    bookmarksView.update(model.state.bookmarks);
    // Загружаем рецепт
    await model.loadRecipe(id);
    // Отображение рецепта
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};
const controlSearchResults = async function () {
  try {
    //Получаем поисковый запрос
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    // Загружаем результат поиска
    await model.loadSearchResults(query);
    // Выводим результат

    resultsView.render(model.getSearchResultPage());
    // Выводим кнопки пагинации
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  // Выводим кнопки пагинации
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // обновить представление рецепта(в state)
  model.updateServings(newServings);
  // Обновить отображение рецепта

  recipeView.update(model.state.recipe);
};

// controlSearchResults();

const controlAddBookmark = function () {
  // Добавлять или удалять закладки
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.delBookmarks(model.state.recipe.id);
  // Обновить вид рецепта
  recipeView.update(model.state.recipe);
  // Отобразить закладки
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    console.log('💩', err);
    addRecipeView.renderError(err.message);
  }
};


const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
