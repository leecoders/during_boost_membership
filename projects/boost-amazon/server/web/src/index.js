// import "@babel/polyfill"; // for web-pack
import { Header } from "./components/Header/Header.js";
import { Nav } from "./components/Nav/Nav.js";
import { Section } from "./components/Section/Section.js";
import { Footer } from "./components/Footer/Footer.js";
import { $, isOutSideOfLayerClicked, closeLayer } from "./utils/util.js";

const header = new Header($("header"), "main");
const nav = new Nav($("nav"));
const section = new Section($("section"));
const footer = new Footer($("footer"));

// 레이어 -> 영역 넘어간 곳 클릭 이벤트 처리
document.body.addEventListener(
  "click",
  e => {
    const layer = $(".layer-on");
    if (!layer) return;
    if (isOutSideOfLayerClicked(layer, e)) {
      closeLayer(layer);
      e.stopPropagation();
    }
  },
  { capture: true }
);
