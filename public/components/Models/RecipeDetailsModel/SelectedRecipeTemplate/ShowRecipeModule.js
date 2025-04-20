export const showRecipeContainer = `
  <div id="popupModal" class="modal recipeDetails">
    <div class="modal-content">

      <!-- panner -->
      <div class="panner-container" style=" background-image: url({{pannerImgUrl}});">
        <svg class="return-icon recipeDetails-returnBTN" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle class="icon-bg" cx="18.5" cy="18.5" r="18.5" fill="#ffefdc"/>
          <path d="M20.4324 10.4929L12.8597 18.1658" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          <path d="M20.5914 25.5713L12.8598 18.1657" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        </svg>
              </div>

      <!-- about-recipe-container -->
      <div class="about-recipe-container">
        <div class="floating-island">
          <h1 class="title">{{recipeName}}</h1>
          <div class="line"></div>
          <div class="recipe-info-icons-container">
            <div class="vegetarian-container">
              <img src="./imgs/vegetarianIcon.svg" alt="">
              <div>{{vegStatus}}</div>
            </div>
            <div class="servings-container">
              <img width="40" src="./imgs/serving.png" alt="">
              <div>{{servings}} Servings</div>

            </div>
            <div class="likes-container">
              <img src="./imgs/like.svg" alt="">
              <div>{{likes}} Likes</div>

            </div>
          </div>
        </div>
        <div class="about-recipe-description-container">
          <div class="about-recipe-title">About Recipe</div>
          <div class="about-recipe-text">{{aboutRecipe}}</div>
        </div>
      </div>
      <!-- Ingredients-container -->

      <div class="ingredients-container">
        <div class="ingredients-title">Ingredients</div>
        <div class="ingredients-imgs-container">
          
       
      </div>
      <div class="button-container">
      <div class="start-cooking-button"><p>Start Cooking</p><img src="./imgs/send-icon-noBG.svg" alt=""> </div>
    </div>
    </div>`;
export const ingredientHtml = `<div class="ingredient" id="{{ingId}}">
  <div class="ingredient-img">
    <img src="{{ingImgUrl}}" alt="{{ingName}}" 
         onerror="this.src='./imgs/noImageFound.png'" />
  </div>
  <div class="ingredient-name">{{ingName}}</div>
</div>`;
