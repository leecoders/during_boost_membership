let liTemplate = "";
for (let i = 0; i < 17; ++i) {
  liTemplate += /*html*/ `
  <li class="lower-li-area">
    <img class="lower-carousel-image"></img>
    <span class="lower-text-container">
      <div class="lower-text-title"></div>
      <div class="lower-text-head"></div>
      <div class="lower-text-body"></div>
      <div class="lower-text-tail"></div>
    </span>
  </li>`;
}

export default /*html*/ `
  <div class="lower-carousel-container">
    <div class="lower-carousel-left-button-area">
      <button
        id="lower-carousel-left-button"
        class="lower-carousel-button"
      ></button>
    </div>
    <div class="lower-carousel-center">
      <div class="lower-img-container">
        <ul id="lower-carousel-image-deque">
          ${liTemplate}
        </ul>
      </div>
    </div>
    <div class="lower-carousel-right-button-area">
      <button
        id="lower-carousel-right-button"
        class="lower-carousel-button"
      ></button>
    </div>
  </div>
`;
