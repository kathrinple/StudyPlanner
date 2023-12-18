const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

const ausgabe = `Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`;
console.log(ausgabe);
