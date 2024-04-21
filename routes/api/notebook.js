//@ts-nocheck
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Notebook } = require('../../models/Notebook');
const authMid = require('../../middleware/authMid');

//  POST
//  api/notebook
//  Create new notebook
//  Private
router.post(
  '/',
  [
    authMid,
    [
      check('title', 'Please include a title for your notebook')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title } = req.body;
      let user = req.user.id;

      let existingNotebook = await Notebook.findOne({ title: title, user: user });

      if (existingNotebook) {
        // I'll do something here
        // Probably changing the notebook title while not removing all the notes
      } else {
        const newNotebook = new Notebook({
          title,
          user,
        });
        notebook = await newNotebook.save();
        res.json(notebook);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//  GET
//  api/notebook/myNotebooks
//  Get logged in user's notebooks
//  Private
router.get('/myNotebooks', authMid, async (req, res) => {
  try {
    const notebooks = await Notebook.find({ user: req.user.id });
    res.json(notebooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  DELETE
//  api/notebook/:notebook_id
//  Delete Notebook by ID
//  Private
router.delete('/:notebook_id', authMid, async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.notebook_id);
    const notebooks = await Notebook.find({ user: req.user.id });

    if (!notebook) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    await notebook.remove();
    res.json(notebooks);

    res.json();
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
