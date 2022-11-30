import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import addRecipeView from './views/addRecipeView.js';
import { TIME_TO_CLOSE_LOADING } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpiner();
    //Update results view to mark serch results active

    resultView.update(model.getSearchgResultsPage());

    // loading the recipe

    await model.loadRecipe(id);

    // Rendering the recipe

    recipeView.render(model.state.recipe);

    //Update bookmarsview to mark the one active
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpiner();

    //Get search results
    const searchResultsValue = searchView.getQuery();
    if (!searchResultsValue) return;

    //Load search results
    await model.loadSerachResults(`${searchResultsValue}`);
    //Render search results
    resultView.render(model.getSearchgResultsPage());

    //Render curent Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (e) {
  //render new results, after clicking buttons
  resultView.render(model.getSearchgResultsPage(e));

  //render new pagination, after clicking buttons
  paginationView.render(model.state.search);
};

const controlServings = function (num) {
  //Update the recipe servings (in state)
  model.updateServings(num);
  //Undate recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add new bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
    //Remove bookmark
  } else model.deleteBookmark(model.state.recipe.id);

  //Update recipe view
  recipeView.update(model.state.recipe);

  //Update bookmarksview
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpiner();

    //Upload RecipeView data
    await model.uploadRecipe(newRecipe);

    //Render uploaded Recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, TIME_TO_CLOSE_LOADING);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateSerrvings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  paginationView.addHandlerClickPag(controlPagination);
};
init();
