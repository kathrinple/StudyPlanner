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

module.exports = Studiengang;
