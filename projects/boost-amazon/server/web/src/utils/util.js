const $ = selector => document.querySelector(selector);

const getImages = imageObj => {
  let ret = [];
  Object.keys(imageObj).forEach(key => {
    imageObj[key].forEach(image => {
      ret.push(image);
    });
  });
  return ret;
};

const openLayer = layer => {
  $(".outside").style.visibility = "visible";
  document.body.style.overflow = "hidden";
  layer.style.visibility = "visible";
  layer.classList.add("layer-on");
};

const closeLayer = layer => {
  $(".outside").style.visibility = "hidden";
  document.body.style.overflow = "scroll";
  layer.style.visibility = "hidden";
  layer.classList.remove("layer-on");
};

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

const toggleUserClickState = layer => {
  const lastLayer = $(".layer-on");
  if (lastLayer) closeLayer(lastLayer);
  else openLayer(layer);
};

export {
  $,
  getImages,
  openLayer,
  closeLayer,
  isOutSideOfLayerClicked,
  toggleUserClickState
};
