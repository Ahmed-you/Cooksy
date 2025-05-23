import "../chat/index.js";
import "../Models/SelectedRecipeInstruction/index.js";
import "../Models/RecipeDetailsModel/index.js";
import "../RecipeGrid/index.js";
import { sendCooksyMsg, sendMsg } from "../chat/index.js";
import { userBubble } from "../chat/ChatTemplate/userBubble.js";
import { cooksyTypingIndicator } from "../chat/ChatTemplate/cooksyTypingIndicator.js";
import { showRecipesInTheGridView } from "../RecipeGrid/index.js";
import { ShowSelectedRecipe } from "../Models/RecipeDetailsModel/index.js";
import { BASE_URL } from "../../main.js";

export const handelCooksyFlow = (userMsg) => {
  console.log(`${BASE_URL}/findRecipes?textInput=${userMsg}`);

  const chatBox = document.querySelector(".chatBox");
  sendMsg(chatBox, userBubble, userMsg);
  //insert cooksy msg
  sendMsg(chatBox, cooksyTypingIndicator);
  cooksyRes(userMsg)
    .then(sendCooksyMsg)
    .then(showRecipesInTheGridView)
    .then(ShowSelectedRecipe)

    .catch((error) => {
      console.log(error);
    });
};

const cooksyRes = (userMsg) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/findRecipes?textInput=${userMsg}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);

        return resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
