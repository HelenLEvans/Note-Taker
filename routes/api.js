const router = require("express").Router();
const store = require("../db/store.js");

router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.post("/notes", (req, res) => {
  const newNote = req.body;
  console.log(newNote);
  store
    .addNote(newNote)
    .then((note) => {
      return res.json(note);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.delete("/notes/:id", (req, res) => {
  store
    .deleteNote(req.params.id)
    .then(() => {
      return res.json({
        message: "note deleted",
      });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

module.exports = router;
