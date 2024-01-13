// Funktion zur Ermittlung der Viewport-Breite
//const getViewportWidth = () =>
//  window.innerWidth || document.documentElement.clientWidth;
/* Gibt innere Breite des Fensters zurück, wenn verfügbar,
  ansonsten Breite des Dokumentelementes (html-Element) */

// Erstellt Zeichenkette mit der Ausgabe der Viewport-Breite
//const ausgabe = `Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`;

// Gibt die Zeichenkette in der Konsole aus
//console.log(ausgabe);

// Fachobjekte

class Studiengang {
  static elementeStudiengang = [];

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.kurse = [];
    Studiengang.elementeStudiengang.push(this);
  }

  getKursById = (id) => {
    const kurs = this.kurse.find((kurs) => kurs.id == id);
    if (!kurs) {
      throw new Error("Kurs mit der ID " + id + " nicht gefunden.");
    }

    return kurs;
  };
}

const validKursTypen = ["V", "Ü", "P", "ÜPP", "SV", "T", "S"];

class Kurs {
  constructor(modulId, name, typ, studiengang, semester, termin, lehrperson) {
    if (!this.istValiderTyp(typ)) {
      const fehlermeldung = "Ungültiger Kurs-Typ: " + typ;
      throw new Error(fehlermeldung);
    }

    this.modulId = modulId;
    this.name = name;
    this.typ = typ;
    this.studiengang = studiengang;
    this.semester = semester;
    this.termin = termin;
    this.lehrperson = lehrperson;
  }

  get id() {
    return [modulId, termin.wochentag, termin.beginn, termin.raum].join("");
  }

  istValiderTyp(typ) {
    return validKursTypen.find((item) => item == typ);
  }
}

function Lehrperson(id, nachname) {
  this.id = id;
  this.nachname = nachname;
}

function Termin(beginn, dauer, wochentag, raum) {
  this.beginn = beginn;
  this.dauer = dauer;
  this.wochentag = wochentag;
  this.raum = raum;
}

class Semesterplan {
  static naechsteId = 0;
  static elementeSemesterplan = [];

  constructor(name, semester, studiengang) {
    this.id = Semesterplan.naechsteId++;
    this.name = name;
    this.semester = semester;
    this.studiengang = studiengang;
    this.kurse = [];
    Semesterplan.elementeSemesterplan.push(this);
  }

  addKurse = (kurse) => {
    kurse.forEach((kurs) => {
      this.kurse.push(kurs);
    });
  };

  getAnzahlKurse = () => {
    return this.kurse.length;
  };

  getAnzahlStunden = () => {
    let anzahlStunden = 0;
    for (let i = 0; i < this.kurse.length; i++) {
      anzahlStunden += this.kurse[i].termin.dauer;
    }
    return anzahlStunden;
  };
}

// Aufgabe 2
const termin1 = new Termin(9, 2, "Montag", "A.1.01");
const lehrperson1 = new Lehrperson("MÜ", "Müller");

const kurs1 = new Kurs(
  "46812",
  "Datenbanken 1",
  "V",
  "Wirtschaftsinformatik",
  "DB1",
  termin1,
  lehrperson1
);

const kurs2 = new Kurs(
  "46834",
  "Künstliche Intelligenz",
  "V",
  "Wirtschaftsinformatik",
  "KI",
  termin1,
  lehrperson1
);

const kurs3 = new Kurs(
  "46990",
  "BWL-Anwendungen",
  "V",
  "Wirtschaftsinformatik",
  "BWL",
  termin1,
  lehrperson1
);

const studiengang = new Studiengang("INF", "Informatik");
const studiengang1 = new Studiengang("WI", "Wirtschaftsinformatik");
const studiengang2 = new Studiengang("MI", "Medizinische Informatik");

const semesterplan = new Semesterplan(
  "Mein Plan",
  "WS 2023/2024",
  "Informatik"
);

const semesterplan1 = new Semesterplan(
  "Plan 1",
  "WS 2023/2024",
  "Wirtschaftsinformatik"
);

const semesterplan2 = new Semesterplan(
  "Plan 2",
  "SS 2023/2024",
  "Medizinische Informatik"
);

// Array in dem die Semesterpläne gespeichert werden
let semesterplaene = [semesterplan, semesterplan1, semesterplan2];

// Kurse zu einem Studiengang und Semesterplan hinzufügen und sortieren
studiengang.kurse.push(kurs1, kurs2, kurs3);
semesterplan.addKurse([kurs1, kurs2, kurs3]);
semesterplan.kurse.sort((kurs1, kurs2) => kurs1.modulId - kurs2.modulId);

studiengang1.kurse.push(kurs1, kurs2, kurs3);
semesterplan1.addKurse([kurs1, kurs2, kurs3]);
semesterplan.kurse.sort((kurs1, kurs2) => kurs1.modulId - kurs2.modulId);

// Funktion zum Gruppieren von Elementen in einem Array nach einer bestimmten Eigenschaft
const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

// Semesterpläne nach Studiengang gruppieren
let gruppiertePlaene = gruppiereNach(semesterplaene, "studiengang");

// HTML-Bereich für die Anzeige der Studiengänge -> section_studiengaenge
const section_studien = document.querySelector("#section_studiengange");
// durch jede Gruppe von Semesterplänen iterieren (gruppiert nach Studiengang)
for (let gruppe in gruppiertePlaene) {
  // <h2> Element für den Studiengang als Überschrift erstellen
  const h2 = document.createElement("h2");
  h2.innerHTML = `${gruppe}`;
  section_studien.appendChild(h2);

  // <ul> Liste für die Semesterpläne des Studiengangs erstellen
  const ul = document.createElement("ul");
  // durch jeden Semesterplan in der aktuellen Gruppe iterieren
  for (let plan of gruppiertePlaene[gruppe]) {
    // <li> Element für jeden Semesterplan erstellen
    const li = document.createElement("li");

    // <li> Element mit Informationen über den Semesterplan füllen
    li.innerHTML = `<a href="plan.html">${
      plan.name
    }</a> (${plan.getAnzahlKurse()} Kurse, ${plan.getAnzahlStunden()} Stunden)`;

    // <li> Element zur <ul> Liste hinzufügen
    ul.appendChild(li);
  }
  // <ul> Liste mit den Semesterplänen zum HTML-Bereich hinzufügen
  section_studien.appendChild(ul);
}

// Semesterpläne nach Semester gruppieren
let gruppiertePlaene1 = gruppiereNach(semesterplaene, "semester");

// HTML-Bereich für die Anzeige der Semesterpläne -> section_semester
const section_semester = document.querySelector("#section_semester");
// durch jede Gruppe von Semesterplänen iterieren (gruppiert nach Semester)
for (let gruppe in gruppiertePlaene1) {
  // <h2> Element für das Semester als Überschrift erstellen
  const h2 = document.createElement("h2");
  h2.innerHTML = `${gruppe}`;
  section_semester.appendChild(h2);

  // <ul> Liste für die Semesterpläne des Studiengangs erstellen
  const ul = document.createElement("ul");
  // durch jeden Semesterplan in der aktuellen Gruppe iterieren
  for (let plan of gruppiertePlaene1[gruppe]) {
    // <li> Element für jeden Semesterplan erstellen
    const li = document.createElement("li");

    // <li> Element mit Informationen über den Semesterplan füllen
    li.innerHTML = `<a href="plan.html">${
      plan.name
    }</a> (${plan.getAnzahlKurse()} Kurse, ${plan.getAnzahlStunden()} Stunden)`;

    // <li> Element zur <ul> Liste hinzufügen
    ul.appendChild(li);
  }
  // <ul> Liste mit den Semesterplänen zum HTML-Bereich hinzufügen
  section_semester.appendChild(ul);
}
