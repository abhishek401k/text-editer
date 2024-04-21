const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const notebookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  entries: [NoteSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('note', NoteSchema);
const Notebook = mongoose.model('notebook', notebookSchema);

module.exports = {
  Note: Note,
  Notebook: Notebook
};