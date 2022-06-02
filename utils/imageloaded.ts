export const imageLoaded = (dom: HTMLImageElement) => {
  return new Promise((resolve, rejected) => {
    if (dom.complete) {
      return resolve(dom);
    } else {
      dom.onload = () => {
        resolve(dom);
      };
    }
  });
};
