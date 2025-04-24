import { createTemplate } from "../../helpers/createTemplate.js";
import { showIngredientsInDom } from "../../RecipeGrid/index.js";
import { showRecipeContainer } from "../RecipeDetailsModel/SelectedRecipeTemplate/ShowRecipeModule.js";
import {
  cookingInstructionPage,
  stepHtml,
} from "./instructionPageTemplate/cookingInstructionPage.js";

const ShowCookingInstruction = (selectedRecipeData) => {
  document.body.insertAdjacentHTML(
    "beforebegin",
    createTemplate(cookingInstructionPage)
  );
  const stepsContainer = document.querySelector(".steps-container");

  selectedRecipeData[0].analyzedInstructions[0].steps.forEach((step) => {
    stepsContainer.insertAdjacentHTML(
      "beforeend",
      createTemplate(stepHtml, {
        stepNumber: step.number,
        stepInstruction: step.step,
      })
    );
    const latestStepEl = stepsContainer.querySelectorAll(".step");
    const currentStepEl = latestStepEl[latestStepEl.length - 1];

    const FromInstruction = true;
    showIngredientsInDom(step.ingredients, FromInstruction, currentStepEl);
  });
};

export const ShowSelectedRecipeInDom = (selectedRecipeData) => {
  const originalUrl = selectedRecipeData[0].image;
  const highResUrl = originalUrl.replace(/-\d+x\d+\.jpg$/, "-636x393.jpg");
  let i = 0;
  const allIngredients =
    selectedRecipeData[0].analyzedInstructions[0].steps.reduce((acu, step) => {
      step.ingredients.forEach((ing) => {
        const alreadyExists = acu.some((item) => item.id === ing.id);
        if (!alreadyExists) {
          acu.push(ing);
        }
      });
      return acu;
    }, []);


  document.body.insertAdjacentHTML(
    "beforebegin",
    createTemplate(showRecipeContainer, {
      pannerImgUrl: highResUrl,
      recipeName: selectedRecipeData[0].title,
      vegStatus:
        selectedRecipeData[0].vegetarian == true
          ? "Vegetarian"
          : "Not Vegetarian",
      servings: selectedRecipeData[0].servings,
      likes: selectedRecipeData[0].aggregateLikes,
      aboutRecipe: generateAboutRecipe(
        selectedRecipeData[0].summary,
        selectedRecipeData[0].servings,
        selectedRecipeData[0].pricePerServing
      ),
    })
  );

  showIngredientsInDom(allIngredients);

  const startCookingButton = document.querySelector(".start-cooking-button");
  startCookingButton.addEventListener("click", (e) => {
    ShowCookingInstruction(selectedRecipeData);

    let indicator = document.querySelector(".scrollIndicator");
    let stepsContainer = document.querySelector(".steps-container");
  
  
    stepsContainer?.addEventListener("scroll", () => {
      let winScroll = stepsContainer.scrollTop; // <-- This is how much you've scrolled!
      let height = stepsContainer.scrollHeight - stepsContainer.clientHeight; // Total scrollable area
      let scrolledPercentage = (winScroll / height) * 100;
  
  
      indicator.style.width = scrolledPercentage + "%";
    });
  });
 
};

document.addEventListener("click", (e) => {
  if (e.target.closest(".instructionPage-returnBTN")) {
    document.querySelector(".instructionPage").remove();
  } else if (e.target.closest(".recipeDetails-returnBTN")) {
    document.querySelector(".recipeDetails").remove();
  }
});

export const generateAboutRecipe = (summary, servings, pricePerServing) => {
  let about = "";
  const calories = summary.match(/(\d+)\s*calories/i);
  const protein = summary.match(/(\d+)g\s*of\s*protein/i);
  const fat = summary.match(/(\d+)g\s*of\s*fat/i);

  const parts = [];

  if (calories) parts.push(`${calories[1]} calories`);
  if (protein) parts.push(`${protein[1]}g of protein`);
  if (fat) parts.push(`${fat[1]}g of fat`);

  if (parts.length) {
    about += ` Each serving contains ${parts.join(", ")}.`;
  }

  if (servings) {
    about += ` Serves ${servings} people.`;
  }

  if (pricePerServing) {
    const dollars = (pricePerServing / 100).toFixed(2);
    about += ` Costs about $${dollars} per serving.`;
  }

  return about;
};
