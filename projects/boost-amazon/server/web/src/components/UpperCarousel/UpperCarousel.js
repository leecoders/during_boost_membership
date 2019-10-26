import { CardCarousel } from "../CardCarousel/CardCarousel.js";
import { $ } from "../../utils/util.js";
import upperCarouselTemplate from "./template.js";
import cardImages from "../../image_objs/cardImage.js";

class UpperCarousel {
  constructor(
    parentElement,
    mainImagesObj,
    { handleCardClick, handleCardButtonClick, handleButtonCheckedNowChange }
  ) {
    this.parentElement = parentElement;
    this.mainImagesObj = mainImagesObj;
    this.cardImagesUrl = [
      "https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_A._CB513333159_.png",
      "https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_B._CB513285352_.png",
      "https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_C._CB513285352_.png",
      "https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_D._CB513285352_.png",
      "https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_E._CB513285352_.png"
    ];
    this.cardNames = Object.keys(this.mainImagesObj).map(key => key);
    this.cardContainers = [];
    this.cardCarousel = [];
    this.handleCardClick = handleCardClick;
    this.handleCardButtonClick = handleCardButtonClick;
    this.handleButtonCheckedNowChange = handleButtonCheckedNowChange;
    this.cards = undefined;
    this.cardButtons = undefined;
    this.render();
  }

  getButtonIdx = button => {
    let ret;
    this.cardButtons.forEach((cardButton, idx) => {
      if (button === cardButton) ret = idx;
    });
    return ret;
  };

  getCardIdxByButton = button => {
    let ret;
    this.cards.forEach((card, idx) => {
      const buttonContainer = card.children[0];
      for (let i = 0; i < buttonContainer.childElementCount; ++i) {
        if (button === buttonContainer.children[i]) ret = idx;
      }
    });
    return ret;
  };

  moveToLeft = button => {
    const buttonIdx = this.getButtonIdx(button);
    const nextButtonIdx =
      buttonIdx === 0 ? this.cardButtons.length - 1 : buttonIdx - 1;
    const nextCardIdx = this.getCardIdxByButton(
      this.cardButtons[nextButtonIdx]
    );
    this.highlightCard(this.cards[nextCardIdx]);
    this.highlightCardButtons(this.cardButtons[nextButtonIdx]);
    this.handleButtonCheckedNowChange(this.cardButtons[nextButtonIdx]);
  };

  moveToRight = button => {
    const buttonIdx = this.getButtonIdx(button);
    const nextButtonIdx =
      buttonIdx === this.cardButtons.length - 1 ? 0 : buttonIdx + 1;
    const nextCardIdx = this.getCardIdxByButton(
      this.cardButtons[nextButtonIdx]
    );
    this.highlightCard(this.cards[nextCardIdx]);
    this.highlightCardButtons(this.cardButtons[nextButtonIdx]);
    this.handleButtonCheckedNowChange(this.cardButtons[nextButtonIdx]);
  };

  lowlightAllCards = () => {
    this.cardContainers.forEach(cardContainer => {
      const card = cardContainer.children[0];
      const buttonContainer = card.children[0];
      card.classList.remove("card-selected");
      buttonContainer.style.visibility = "hidden";
    });
  };

  highlightCard = card => {
    this.lowlightAllCards();
    const buttonContainer = card.children[0];
    buttonContainer.style.visibility = "visible";
    card.classList.add("card-selected");
  };

  lowlightAllCardButtons = () => {
    this.cardButtons.forEach(cardButton => {
      cardButton.classList.remove("card-button-selected");
    });
  };

  highlightCardButtons = button => {
    this.lowlightAllCardButtons();
    button.classList.add("card-button-selected");
  };

  setCardContainers = () => {
    for (let i = 1; i < 6; ++i) {
      this.cardContainers.push($(`.upper-carousel-card-${i}`));
    }
  };

  setCardCarousel = () => {
    for (let i = 0; i < 5; ++i) {
      this.cardCarousel.push(
        new CardCarousel(
          this.cardContainers[i],
          this.cardImagesUrl[i],
          this.cardNames[i],
          this.mainImagesObj[this.cardNames[i]].length,
          cardImages[i],
          { handleCardButtonClick: this.handleCardButtonClick }
        )
      );
    }
  };

  setCardEvent = () => {
    this.cardContainers.forEach(cardContainer => {
      cardContainer.addEventListener("click", () => {
        const card = cardContainer.children[0];
        this.handleCardClick(card);
      });
    });
  };

  render = () => {
    this.parentElement.innerHTML = upperCarouselTemplate;
    this.setCardContainers();
    this.setCardCarousel();
    this.setCardEvent();
    this.cards = document.querySelectorAll(".card-carousel-container");
    this.cardButtons = document.querySelectorAll(".card-circle-button");
  };
}

export { UpperCarousel };
