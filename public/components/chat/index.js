import { chatBox } from "./ChatTemplate/chatHtml.js";

import { createTemplate } from "../helpers/createTemplate.js";
import { handelCooksyFlow } from "../Main/index.js";
import { cooksyBubble } from "./ChatTemplate/cooksyBubble.js";

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
  const userMsg = cooksyInp.value.trim();
  if (isBlockedSend) return;

  if (!userMsg) return;

  if (!IsMoreThen1Msg) {
    ChangeAppUiAfterFirstMsg(userMsg);
  } else {
    sendIcon.classList.add("hide");
    isBlockedSend = true;
    handelCooksyFlow(userMsg);
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

  // Get screen height and form Y position
  const screenHeight = window.innerHeight;
  const cooksyInpRect = cooksyInp.getBoundingClientRect();

  const currentY = cooksyInpRect.top + cooksyInpRect.height;

  // move to the bottom of the page
  const targetY = screenHeight - 25;

  const distance = targetY - currentY;

  // Apply that distance as a transform
  formContainer.style.transition = "transform 0.7s ease";
  formContainer.style.transform = `translateY(${distance}px)`;

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

export const sendMsg = (insertInElement, Bubble, Msg) => {
  insertInElement.insertAdjacentHTML(
    "beforeend",
    createTemplate(Bubble, { Msg })
  );
  insertInElement.scrollTo(0, insertInElement.scrollHeight);
};

export const sendCooksyMsg = (cooksyRes) => {
  const chatBoxElement = document.querySelector(".chatBox");
  const cooksyMsg = cooksyRes.msg || cooksyRes.AIData.msg;

  chatBoxElement.querySelector(".cooksyType").remove();
  sendMsg(chatBoxElement, cooksyBubble, cooksyMsg);
  isBlockedSend = false;
  return cooksyRes;
};
