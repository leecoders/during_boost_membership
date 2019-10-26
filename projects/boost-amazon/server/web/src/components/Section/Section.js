import sectionTemplate from "./template.js";
import { $ } from "../../utils/util.js";
import { MiniCarousel } from "../MiniCarousel/MiniCarousel.js";
import { MainCarousel } from "../MainCarousel/MainCarousel.js";
import { miniImages } from "../../image_objs/miniImage.js";
import mainImagesObj from "../../image_objs/mainImage.js";

class Section {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
  }

  render() {
    this.parentElement.innerHTML = sectionTemplate;
    this.miniCarousel = new MiniCarousel(
      $(".mini-container"),
      miniImages,
      miniImages.length,
      -20
    );
    this.mainCarousel = new MainCarousel($(".main-container"), mainImagesObj);
  }
}

export { Section };
