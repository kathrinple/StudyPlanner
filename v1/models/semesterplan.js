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

module.exports = Semesterplan;
