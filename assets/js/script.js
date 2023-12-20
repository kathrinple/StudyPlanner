// Funktion zur Ermittlung der Viewport-Breite
const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;
/* Gibt innere Breite des Fensters zurück, wenn verfügbar,
  ansonsten Breite des Dokumentelementes (html-Element) */

// Erstellt Zeichenkette mit der Ausgabe der Viewport-Breite
const ausgabe = `Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`;

// Gibt die Zeichenkette in der Konsole aus
console.log(ausgabe);
