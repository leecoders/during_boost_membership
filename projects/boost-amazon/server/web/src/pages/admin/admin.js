import { Header } from "../../components/Header/Header.js";
import { Footer } from "../../components/Footer/Footer.js";
import { $, isOutSideOfLayerClicked, closeLayer } from "../../utils/util.js";
import { SectionForAdmin } from "../../components/SectionForAdmin/SectionForAdmin.js";

const sectionForAdmin = new SectionForAdmin($("section"));
const header = new Header($("header"), "admin");
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
