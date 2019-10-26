import { $, toggleUserClickState } from "../../utils/util.js";

class ListItem {
  constructor(parentElement, image, name, category, summary, idx) {
    this.parentElement = parentElement;
    this.image = image;
    this.name = name;
    this.category = category;
    this.summary = summary;
    this.idx = idx;
    this.render();
  }

  setImages = () => {
    const imageBox = $(`#item-image-${this.category}-${this.idx}`);
    // const imageUrl = `http://106.10.34.142:3000/public/item_images/${this.image}`;
    const imageUrl = `http://localhost:3000/public/item_images/${this.image}`;
    imageBox.style.background = `url(${imageUrl}) no-repeat 50% 50%`;
    imageBox.style.backgroundSize = "10rem 10rem";
  };

  render() {
    this.parentElement.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <div class="item-container" id="item-${this.idx}">
        <div class="item-image" id="item-image-${this.category}-${
        this.idx
      }"></div>
        <div class="item-info">
            <div class="item-name">
                <span class="item-info-title">상품명</span>
                <span class="item-info-content">${this.name}</span>
            </div>
            <div class="item-category">
                <span class="item-info-title">분류</span>
                <span class="item-info-content">${this.category}</span>
            </div>
            <div class="item-summary">
                <span class="item-info-title">요약</span>
                <span class="item-info-content">
                  ${
                    this.summary.length > 50
                      ? this.summary.substring(0, 50) + "..."
                      : this.summary
                  } 
                </span>
            </div>
        </div>
        <div class="item-delete-button-container">
            <button type="button" class="item-delete-button" id="item-delete-button-${
              this.category
            }-${this.idx}"></button>
        </div>
    </div>
    `
    );
    this.setImages();
  }
}

export { ListItem };
