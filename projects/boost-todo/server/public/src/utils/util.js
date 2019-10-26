const $ = selector => document.querySelector(selector);

const isOutSideOfLayer = (tx, ty, x1, y1, x2, y2) => {
  return !(x1 <= tx && tx <= x2 && (y1 <= ty && ty <= y2));
};

const isOutSideOfLayerClicked = (layer, e) => {
  const boundingRect = layer.getBoundingClientRect();
  const x1 = boundingRect.x;
  const y1 = boundingRect.y;
  const x2 = x1 + boundingRect.width;
  const y2 = y1 + boundingRect.height;
  if (isOutSideOfLayer(e.x, e.y, x1, y1, x2, y2)) return true;
  return false;
};

const findAncestorsElement = (now, targetClassName) => {
  if (now.className === targetClassName || now === document.body) return now;
  return findAncestorsElement(now.parentNode, targetClassName);
};

export { $, isOutSideOfLayerClicked, findAncestorsElement };
