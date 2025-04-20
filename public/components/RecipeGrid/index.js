import { createTemplate } from "../helpers/createTemplate.js";
import { ingredientHtml } from "../Models/RecipeDetailsModel/SelectedRecipeTemplate/ShowRecipeModule.js";
import { StepIngredientHtml } from "../Models/SelectedRecipeInstruction/instructionPageTemplate/cookingInstructionPage.js";
import { recipeGridView, recipeItem } from "./GridPageHtmlTemplate/recipesGridView.js";

export const showRecipesInTheGridView = (cooksyRes) => {
  if (!cooksyRes.AIData) {
    return Promise.resolve(cooksyRes);
  }
  console.log("I am in the showREcipesFunction");

  //show grideView of founded recipes
  return new Promise((resolve) => {
    setTimeout(() => {
      const chatBox = document.querySelector(".chatBox");
      chatBox.innerHTML = "";
      chatBox.insertAdjacentHTML("afterbegin", createTemplate(recipeGridView));
      const recipeGridContainerElement = document.querySelector(
        ".recipeGridView-container"
      );
      cooksyRes.results.forEach((result) => {
        const recipeTitle = result.title;
        const imgUrl = result.image;
        const recipeId = result.id;
        console.log(recipeTitle);

        recipeGridContainerElement.insertAdjacentHTML(
          "afterbegin",
          createTemplate(recipeItem, { imgUrl, recipeTitle, recipeId })
        );
      });
      resolve({ cooksyRes, recipeGridContainerElement });
    }, 2000);
  });
};

export const showIngredientsInDom = (
  ingredientsArray,
  FromInstruction,
  stepEl = null
) => {
  console.log(ingredientsArray);
  let IngredientsImgsContainer;
  let WantedIngredientHtml;

  if (ingredientsArray.length === 0) {
    if (FromInstruction && stepEl) {
      const stepContainer = stepEl.querySelector(
        ".step-ingredients-container-adjusted"
      );
      if (stepContainer) stepContainer.remove();
    } else {
      const generalContainer = document.querySelector(".ingredients-container");
      if (generalContainer) generalContainer.remove();
    }
    return;
  }

  if (FromInstruction && stepEl) {
    IngredientsImgsContainer = stepEl.querySelector(
      ".step-ingredients-imgs-container-adjusted"
    );
    WantedIngredientHtml = StepIngredientHtml;
  } else {
    IngredientsImgsContainer = document.querySelector(
      ".ingredients-imgs-container"
    );
    WantedIngredientHtml = ingredientHtml;
  }

  ingredientsArray.forEach((ingredient) => {
    const imgId = `ing-${ingredient.id}`;
    IngredientsImgsContainer.insertAdjacentHTML(
      "afterbegin",
      createTemplate(WantedIngredientHtml, {
        ingName: ingredient.localizedName,
        ingImgUrl: `https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`,
        ingId: imgId,
      })
    );
  });
};
