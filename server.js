const express = require("express");

// const api = require("./routes/api.js");
const html = require("./routes/html.js");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use("/api", api);
app.use("/", html);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
