const validKursTypen = ["V", "Ü", "P", "ÜPP", "SV", "T", "S", "Org"];

class Kurs {
  constructor(
    modulId,
    name,
    typ,
    studiengang,
    semester,
    gruppenbuchstabe,
    lehrperson,
    termin
  ) {
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
    this.gruppenbuchstabe = gruppenbuchstabe;
  }

  get id() {
    return [
      this.modulId,
      this.termin.wochentag,
      this.termin.beginn,
      this.termin.raum,
    ].join("");
  }

  istValiderTyp(typ) {
    return validKursTypen.find((item) => item == typ);
  }
}

module.exports = Kurs;
