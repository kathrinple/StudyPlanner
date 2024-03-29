const fetcher = require("../models/scheduleFetcher");

// [TODO]
const Studiengang = require("../models/studiengang");
const Kurs = require("../models/kurs");
const Lehrperson = require("../models/lehrperson");
const Termin = require("../models/termin");

const lehrangebot = [];

const semesterplaene = [];

/**
 * Initialisiert die Daten der Anwendung, also die verfuegbaren Studiengaenge mit den
 * zugehoerigen Kursen. Die Daten werden zunaechst asynchron über das scheduleFetcher-Modul
 * abgerufen (Nutzung der Promise-API mit "then"). Danach werden die erhaltenen Daten
 * mittels map-Funktion in die Datenstrukturen unserer Anwendung konvertiert. Schliesslich
 * wird jeder erhaltene Datensatz im lehrangebot-Array hinzugefuegt.
 */
const initialisiereLehrangebot = () => {
  fetcher.fetchScheduleData().then((daten) => {
    daten
      .map(
        (stdg) =>
          new Studiengang(
            stdg.sname,
            stdg.name,
            stdg.courses.map(
              (kurs) =>
                new Kurs(
                  kurs.courseId,
                  kurs.name,
                  kurs.courseType,
                  kurs.courseOfStudy,
                  kurs.termId,
                  kurs.studentSet,
                  new Lehrperson(kurs.lecturerId, kurs.lecturerSurname),
                  new Termin(
                    kurs.timeSlotBegin,
                    kurs.timeSlotDuration,
                    kurs.weekday,
                    kurs.roomId
                  )
                )
            )
          )
      )
      .forEach((datensatz) => lehrangebot.push(datensatz));
    console.log("Basisdaten initialisiert.");
  });
};

// [TODO]
// Weitere Funktionen aus der Aufgabenstellung implementieren
function ermittleStudiengangZuId(id) {
  return lehrangebot.find((studiengang) => studiengang.id == id);
}

function ermittleKursZuStudiengangUndId(studiengangId, kursId) {
  const studiengang = ermittleStudiengangZuId(studiengangId);
  if (studiengang.kurse) {
    return studiengang.kurse.find((kurs) => kurs.id == kursId);
  } else {
    console.log(`Studiengang ${studiengang.id} hat keine Kurse.`);
    return null;
  }
}

function holeAlleStudiengaenge() {
  return lehrangebot;
}

function erstelleSemesterplan(name, semester, jahr, studiengangId, kurse) {
  const semesterplan = {
    name: name,
    semester: semester,
    jahr: jahr,
    studiengangId: studiengangId,
    kurse: kurse,
  };
  semesterplaene.push(semesterplan);
  return semesterplan;
}

function ermittleSemesterplanZuId(id) {
  return semesterplaene.find((semesterplan) => semesterplan.id === id);
}

const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

function holePlaeneGruppiertNachSemester() {
  return gruppiereNach(semesterplaene, "semester");
}

function holePlaeneGruppiertNachStudiengang() {
  return gruppiereNach(semesterplaene, "studiengang");
}

// [TODO]
// Schnittstelle des Moduls definieren: Lehrangebot-Array und Funktionen
// von aussen zugreifbar machen
module.exports = {
  lehrangebot,
  initialisiereLehrangebot,
  ermittleStudiengangZuId,
  ermittleKursZuStudiengangUndId,
  holeAlleStudiengaenge,
  erstelleSemesterplan,
  ermittleSemesterplanZuId,
  holePlaeneGruppiertNachSemester,
  holePlaeneGruppiertNachStudiengang,
};
