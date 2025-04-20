import { ShowSelectedRecipeInDom } from "../SelectedRecipeInstruction/index.js";

export const ShowSelectedRecipe = (resObj) => {
  const recipeGridContainerElement = resObj.recipeGridContainerElement;
  const recipesObj = resObj.cooksyRes.results;
  if (recipeGridContainerElement == undefined) return;
  recipeGridContainerElement.addEventListener("click", (e) => {
    const recipe = e.target.closest(".recipe-item-container");
    if (!recipe) return;
    const recipeId = e.target.closest(".recipe-item-container").id;
    const selectedRecipeData = recipesObj.filter((recipe) => {
      return recipe.id == recipeId;
    });
    ShowSelectedRecipeInDom(selectedRecipeData);
    return selectedRecipeData;
  });
};
