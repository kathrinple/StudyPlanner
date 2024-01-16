const express = require("express");
// [TODO]
// Weitere benoetigte Module einbinden
const {
  holePlaeneGruppiertNachSemester,
  holePlaeneGruppiertNachStudiengang,
  ermittleSemesterplanZuId,
  ermittleKursZuStudiengangUndId,
  erstelleSemesterplan,
} = require("../models/persistence.js");

const router = express.Router();

router.get("/index", (req, res) => {
  // [TODO]
  // Implementieren: Liste der Semesterplaene anzeigen,
  // dabei Gruppierung beachten (nach Semester oder Studiengang,
  // Einstellung als Anfrage/Query-Parameter gegeben)
  const gruppierung = req.query.gruppierung || "Semester";
  const plaene =
    gruppierung === "Studiengang"
      ? holePlaeneGruppiertNachStudiengang()
      : holePlaeneGruppiertNachSemester();
  res.render("index", { plaene });
});

router.get("/plan", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Semesterplan mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
  const id = req.query.id;
  const plan = ermittleSemesterplanZuId(id);
  if (plan) {
    res.render("plan", { plan });
  } else {
    next();
  }
});

router.get("/kurs", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Kurs mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
  const sid = req.query.sid;
  const kid = req.query.kid;
  const kurs = ermittleKursZuStudiengangUndId(sid, kid);
  if (kurs) {
    res.render("kurs", { kurs });
  } else {
    next();
  }
});

router.get("/neu", (req, res) => {
  // [TODO]
  // Schritt 1 des Formulares zum Erstellen eines neuen
  // Semesterplanes anzeigen
  res.render("neu");
});

router.post("/waehleStudiengang", (req, res) => {
  // [TODO]
  // Formular zum Erstellen eines neuen Semesterplanes:
  // Den in Schritt 1 gewaehlten Studiengang ermitteln
  // (ID als Anfrage/Query-Parameter gegeben) und passend
  // dazu Schritt 2 anzeigen (z.B. nur die Kurse, die auch
  // zum gewaehlten Studiengang gehoeren)
  const studiengangId = req.body.studiengangId;

  res.render("waehleStudiengang", { studiengangId });
});

router.post("/neu", (req, res) => {
  // [TODO]
  // Schritt 2 wurde durchgefuehrt: Neuen Semesterplan aus
  // den eingebenen Daten erstellt und ueber das Persistenz-
  // Modul sichern. Danach auf die Seite "Liste der Semesterplaene"
  // umleiten.
  const { name, semester, jahr, studiengangId, kurse } = req.body;
  erstelleSemesterplan(name, semester, jahr, studiengangId, kurse);
  res.redirect("/index");
});

router.get("/", (req, res) => {
  // [TODO]
  // Auf die Seite "Liste der Semesterplaene" umleiten.
  res.redirect("/index");
});

module.exports = router;
