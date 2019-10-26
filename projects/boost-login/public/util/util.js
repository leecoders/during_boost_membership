const includeSpecial = str => {
  return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
};
const deleteFromUserInfo = ({ userInterests }, target) => {
  const idx = userInterests.findIndex(interest => interest == target);
  userInterests.splice(idx, 1);
};
const deleteTag = selector => {
  document
    .querySelector(`#interests-area`)
    .removeChild(document.querySelector(selector));
};
const closeAllLayer = parent => {
  const layers = document.querySelectorAll(`.layer`);
  layers.forEach(layer => {
    parent.removeChild(layer);
  });
};
const closeLayer = layer => {
  const parent = layer.parentNode;
  const outside = document.querySelector(".outside");
  parent.removeChild(layer);
  outside.parentNode.removeChild(outside);
  document.body.style.overflow = "scroll"; // 부모 스크롤 복구
};

const isOutSideOfLayer = (tx, ty, x1, y1, x2, y2) => {
  return !(x1 <= tx && tx <= x2 && (y1 <= ty && ty <= y2));
};

const stopParentsScroll = layer => {
  document.body.style.overflow = "hidden";
};

const initPageSetting = () => {
  document.body.style.background = "#f5f6f7";
  document.body.style.overflow = "scroll";
};

export {
  includeSpecial,
  deleteFromUserInfo,
  deleteTag,
  closeAllLayer,
  closeLayer,
  isOutSideOfLayer,
  stopParentsScroll,
  initPageSetting
};
