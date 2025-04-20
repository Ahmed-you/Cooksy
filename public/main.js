
import "./components/Main/index.js";

import { createTemplate } from "./components/helpers/createTemplate.js";
import { userBubble } from "./components/chat/ChatTemplate/userBubble.js";
import { cooksyTypingIndicator } from "./components/chat/ChatTemplate/cooksyTypingIndicator.js";
import {
  recipeGridView,
  recipeItem,
} from "./components/RecipeGrid/GridPageHtmlTemplate/recipesGridView.js";
import {
  ingredientHtml,
  showRecipeContainer,
} from "./components/Models/RecipeDetailsModel/SelectedRecipeTemplate/ShowRecipeModule.js";
import {
  cookingInstructionPage,
  stepHtml,
  StepIngredientHtml,
} from "./components/Models/SelectedRecipeInstruction/instructionPageTemplate/cookingInstructionPage.js";
import { sendCooksyMsg, sendMsg } from "./components/chat/index.js";

// on click event this function will be called to show recipe info and img

// handel the promis chain of cooksy


