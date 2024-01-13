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

const semesterplan = new Semesterplan(
  "Mein Plan",
  "WS 2023/2024",
  "Wirtschaftsinformatik"
);
const studiengang = new Studiengang("WI", "Wirtschaftsinformatik");

const semesterplan1 = new Semesterplan(
  "Mein Plan",
  "WS 2023/2024",
  "Wirtschaftsinformatik"
);
const studiengang1 = new Studiengang("WI", "Wirtschaftsinformatik");

studiengang.kurse.push(kurs1, kurs2, kurs3);
semesterplan.addKurse([kurs1, kurs2, kurs3]);
semesterplan.kurse.sort((kurs1, kurs2) => kurs1.modulId - kurs2.modulId);

studiengang1.kurse.push(kurs1, kurs2, kurs3);
semesterplan1.addKurse([kurs1, kurs2, kurs3]);
semesterplan.kurse.sort((kurs1, kurs2) => kurs1.modulId - kurs2.modulId);

for (let i = 0; i < Studiengang.elementeStudiengang.length; i++) {
  let studiengang = Studiengang.elementeStudiengang[i];
  console.log(`${studiengang.name} (${studiengang.id})`);
  for (let j = 0; j < studiengang.kurse.length; j++) {
    let kurs = studiengang.kurse[j];
    console.log(`\t${kurs.modulId}: ${kurs.name}`);
  }
}

for (let i = 0; i < Semesterplan.elementeSemesterplan.length; i++) {
  let semesterplan = Semesterplan.elementeSemesterplan[i];
  console.log(`${semesterplan.name} (${semesterplan.semester})`);
  for (let j = 0; j < semesterplan.kurse.length; j++) {
    let kurs = semesterplan.kurse[j];
    console.log(`\t${kurs.modulId}: ${kurs.name}`);
  }
}
