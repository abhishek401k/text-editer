//@ts-nocheck
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Note } = require('../../models/Notebook');
const { Notebook } = require('../../models/Notebook');
const User = require('../../models/User');
const authMid = require('../../middleware/authMid');

//  POST
//  api/note
//  Create new note
//  Private
router.post(
  '/',
  [
    authMid,
    [check('title', 'A title is required on a note...').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, content } = req.body;
      let user = req.user.id;
      let note = await Note.findOne({ title: title });

      // Update note in "All Notes"
      if (note && note.user.toString() === user) {
        note = await Note.findOneAndUpdate(
          { title: title },
          { $set: { title: title, content: content } },
          { $new: true }
        );

        await note.save();

        // Update note in Notebook if is in Notebook
        Notebook.findOneAndUpdate(
          { 'entries.title': title },
          { $set: { 'entries.$.content': content } }).exec();

      } else {
        const newNote = new Note({
          title,
          content,
          user,
        });

        note = await newNote.save();
        res.json(note);

      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//  GET
//  api/note/myNotes
//  Get logged in user's notes
//  Private
router.get('/myNotes', authMid, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  DELETE
//  api/note/:note_id/:notebook_id?
//  Delete
//  Private
router.delete('/:note_id', authMid, async (req, res) => {
  try {
    // Removing note from note collection
    await Note.deleteOne({ _id: req.params.note_id });
    res.json({ msg: 'Note deleted...' });

    // Removing note from notebook collection
    Notebook.findOne({ 'entries._id': req.params.note_id }, function (
      err,
      result
    ) {
      if (err) {
        console.log(err);
      }
      if (!result) {
        console.log('Note deleted...');
      } else {
        let id = req.params.note_id;
        result.entries.id(id).remove();
        result.save();
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//  PUT
//  api/note/organize/:note_id/:notebook_id
//  organize note into notebook
//  Private
router.put('/organize/:note_id/:notebook_id', authMid, async (req, res) => {
  try {
    const note = await Note.findById(req.params.note_id);
    const notebook = await Notebook.findById(req.params.notebook_id);

    const existsInNotebook = notebook.entries.some(
      (entry) => JSON.stringify(entry._id) === JSON.stringify(note._id)
    );

    // Remove note from current notebook before pushing into new notebook

    if (existsInNotebook) {
      console.log('Note already exists within this notebook');
    } else {
      Notebook.findOne({ 'entries._id': req.params.note_id }, function (err, result) {
        if (err) {
          console.log(err);
        }
        if (!result) {
          console.log('Not currently in notebook');
        } else {
          let id = req.params.note_id;
          result.entries.id(id).remove();
          result.save();
        }
      });

      notebook.entries.push(note);
      await notebook.save();
    }

    res.json(notebook);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
