const express = require("express");
const path = require("path");

const movies = require("./movies_metadata.json");

const app = express();

// // PWAs want HTTPS!
// // function checkHttps(request, response, next) {
// //   // Check the protocol — if http, redirect to https.
// //   console.log(request.get("X-Forwarded-Proto"));
// //   if (
// //     request.get("X-Forwarded-Proto") &&
// //     request.get("X-Forwarded-Proto").includes("https") != -1
// //   ) {
// //     console.log("Next");
// //     return next();
// //   } else {
// //     console.log("https://" + request.hostname + ":3001" + request.url);
// //     response.redirect("https://" + request.hostname + ":3001" + request.url);
// //   }
// // }

// // app.all("*", checkHttps);

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// A mock route to return some data.
app.get("/api/movies", (request, response) => {
  console.log("❇️ Received GET request to /api/movies");
  response.send(movies);
});

app.get("/api/movie", (request, response) => {
  let movieId;
  movies.map((movie, i) => {
    if (movie.id.toString() === request.query.id.toString()) {
      movieId = !movieId && i ? i : null;
    }
  });
  response.send(movies[movieId]);
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
