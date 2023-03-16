const fs = require("fs");
const util = require("util");
const { v4: createId } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf-8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      return [].concat(JSON.parse(notes));
    });
  }
  addNote(newNote) {
    newNote.id = createId();
    return this.getNotes()
      .then((notes) => {
        notes.push(newNote);
        return notes;
      })
      .then((updatedNotes) => {
        return this.write(updatedNotes);
      })
      .then(() => {
        return newNote;
      });
  }
  deleteNote(id) {
    return this.getNotes()
      .then((notes) => {
        return notes.filter((note) => {
          return note.id !== id;
        });
      })
      .then((updatedNotes) => {
        return this.write(updatedNotes);
      });
  }
}

module.exports = new Store();
