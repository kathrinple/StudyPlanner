const http = require("http");
const persistence = require("../models/persistence.js");

const server = http.createServer(function (request, response) {
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });

  const courses = persistence.holeAlleStudiegaenge();

  const html = `<!DOCTYPE html>
        <html>
            <head>
                <title>Study Planner Test</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Test</h1>
                <p>${persistence.test()}</p>
            </body>
        </html>`;

  response.end(html);
});

server.listen(8844, () => {
  console.log("Server running at http://localhost:8844");
});
