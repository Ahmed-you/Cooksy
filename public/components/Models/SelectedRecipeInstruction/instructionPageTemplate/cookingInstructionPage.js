export const cookingInstructionPage = `
  <div class="modal instructionPage">
    <div class="modal-content">
      <div class="header">
        <svg class="return-icon instructionPage-returnBTN" width="37" height="37" viewBox="0 0 37 37" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle class="icon-bg" cx="18.5" cy="18.5" r="18.5" fill="#fff8f0" />
          <path d="M20.4324 10.4929L12.8597 18.1658" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M20.5914 25.5713L12.8598 18.1657" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>

        <div class="module-title">Cooking</div>
        <div class="scrollIndicator-container">
          <div class="scrollIndicator"></div>
        </div>
      </div>

      <div class="steps-container">
    
    </div>`;

export const stepHtml = `<div class="step">
  <div class="step-number">step {{stepNumber}}</div>
  <div class="step-instruction-text">{{stepInstruction}}</div>
  <div class="ingredients-container step-ingredients-container-adjusted">
    <div class="ingredients-title step-ingredients-title-adjusted">
      Ingredients
    </div>
    <div
      class="ingredients-imgs-container step-ingredients-imgs-container-adjusted"
    >
   
    </div>
  </div>
</div>
`;

export const StepIngredientHtml = `
   <div class="ingredient" id="{{ingId}}">
        <div class="ingredient-img step-ingredient-img-adjusted">
          <img
            src="{{ingImgUrl}}"
            alt="{{ingName}}"
            onerror="this.src='./imgs/noImageFound.png'"
          />
        </div>
        <div class="ingredient-name">{{ingName}}</div>
      </div>`;
