import { createTemplate } from "./helpers/createTemplate.js";
import { chatBox } from "./Template/chatBox.js";
import { userBubble } from "./Template/userBubble.js";
import { cooksyBubble } from "./Template/cooksyBubble.js";
import { cooksyTypingIndicator } from "./Template/cooksyTypingIndicator.js";
import { recipeGridView, recipeItem } from "./Template/recipesGridView.js";
const cooksyInp = document.querySelector(".cooksy-inp");
const sendIcon = document.querySelector(".send-icon");
const inputLabel = document.querySelector(".input-label");
const topLine = document.querySelector(".top-line");
const mainContainer = document.querySelector(".main-container");
const formContainer = document.querySelector(".form-container");
let isBlockedSend = false;
let IsMoreThen1Msg = false;
cooksyInp.addEventListener("input", () => {
  const value = cooksyInp.value.trim();

  sendIcon.classList.toggle("hide", value.length === 0);
});

sendIcon.addEventListener("click", (e) => {
  console.log(isBlockedSend);

  if (isBlockedSend) return;
  const userMsg = cooksyInp.value.trim();
  if (!userMsg) return;

  if (!IsMoreThen1Msg) {
    ChangeAppUiAfterFirstMsg(userMsg);
  } else {
    isBlockedSend = true;

    handelCooksyFlow();
  }

  cooksyInp.value = "";
});

formContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  const userMsg = cooksyInp.value.trim();
  if (isBlockedSend) return;

  if (!userMsg) return;

  if (!IsMoreThen1Msg) {
    ChangeAppUiAfterFirstMsg(userMsg);
  } else {
    sendIcon.classList.add("hide");
    isBlockedSend = true;
    //insert user msg
    handelCooksyFlow(userMsg);
  }

  cooksyInp.value = "";
});

const ChangeAppUiAfterFirstMsg = (userMsg) => {
  topLine.classList.add("fade-effect");
  inputLabel.classList.add("fade-effect");

  // Step 1: Get screen height and form Y position
  const screenHeight = window.innerHeight;
  const cooksyInpRect = cooksyInp.getBoundingClientRect();

  const currentY = cooksyInpRect.top + cooksyInpRect.height;

  // Step 2: move to the bottom of the page
  const targetY = screenHeight - 25;

  const distance = targetY - currentY;

  // Step 3: Apply that distance as a transform
  formContainer.style.transition = "transform 0.7s ease";
  formContainer.style.transform = `translateY(${distance}px)`;

  // Step 4: After animation, reset and snap layout into place
  setTimeout(() => {
    formContainer.style.transform = "";
    formContainer.style.transition = "";
    mainContainer.classList.add("ChatBoxFlexChange");
    topLine.classList.add("hide");
    inputLabel.classList.add("hide");
    formContainer.insertAdjacentHTML(
      "beforebegin",
      createTemplate(chatBox, { userMsg: userMsg })
    );

    isBlockedSend = true;
    handelCooksyFlow(userMsg);
  }, 700);

  IsMoreThen1Msg = true;
};

const sendMsg = (insertInElement, Bubble, Msg) => {
  console.log("insertInElement:", insertInElement);
  console.log("Bubble:", Bubble);
  console.log("Msg:", Msg);

  insertInElement.insertAdjacentHTML(
    "beforeend",
    createTemplate(Bubble, { Msg })
  );
  insertInElement.scrollTo(0, insertInElement.scrollHeight);
};

const cooksyRes = (userMsg) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:4002/findRecipes?textInput=${userMsg}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const sendCooksyMsg = (cooksyRes) => {
  const chatBoxElement = document.querySelector(".chatBox");
  const cooksyMsg = cooksyRes.msg || cooksyRes.AIData.msg;
  chatBoxElement.querySelector(".cooksyType").remove();
  sendMsg(chatBoxElement, cooksyBubble, cooksyMsg);
  isBlockedSend = false;
  return cooksyRes;
};

const showRecipesInTheGridView = (cooksyRes) => {
  if (cooksyRes?.AIData?.ready != true) return new Promise.resolve(cooksyRes);

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

// on click event this function will be called to show recipe info and img
const ShowSelectedRecipe = (resObj) => {
  const recipeGridContainerElement = resObj.recipeGridContainerElement;

  if (recipeGridContainerElement == undefined) return;
  recipeGridContainerElement.addEventListener("click", (e) => {
    const recipe = e.target.closest(".recipe-item-container");
    if (!recipe) return;
    const recipeId = e.target.closest(".recipe-item-container").id;
    console.log(recipeId);
  });
};

// handel the promis chain of cooksy

const handelCooksyFlow = (userMsg) => {
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
