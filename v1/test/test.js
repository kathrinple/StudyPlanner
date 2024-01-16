const http = require("http");
const persistence = require("../models/persistence.js");

persistence.initialisiereLehrangebot();

const server = http.createServer(function (request, response) {
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });

  const studiengaenge = persistence.holeAlleStudiengaenge();
  let html = `<!DOCTYPE html>
    <html>
        <head>
            <title>Study Planner</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Study Planner Test</h1>`;

  studiengaenge.forEach((studiengang) => {
    html += `<h2>${studiengang.name} (${studiengang.id})</h2>`;
    console.log(`${studiengang.kurse.length} Kurse enthalten`);
    html += `<p>${studiengang.kurse.length} Kurse enthalten:</p>`;
    html += `<ul>`;
    studiengang.kurse.forEach((kurs) => {
      html += `<li>${kurs.modulId} ${kurs.name} [${kurs.typ}] (${kurs.lehrperson.nachname})</li>`;
    });
    html += `</ul>`;
  });
  html += `</body></html>`;
  response.end(html);
});

server.listen(8844, () => {
  console.log("Server running at http://localhost:8844");
});
