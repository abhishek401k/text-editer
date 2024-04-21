import { CREATE_NOTE, GET_USER_NOTES, SET_NOTE, DELETE_NOTE, ORGANIZE_NOTE } from './types';
import axios from 'axios';

import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { getUserNotebooks } from './notebook';

// Select Note from the sidebar and display it in the editor
export const setNote = (note) => async dispatch => {
  dispatch({
    type: SET_NOTE,
    payload: note
  });
};

// Get Logged in User's notes
export const getUserNotes = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/note/myNotes');

    dispatch({
      type: GET_USER_NOTES,
      payload: res.data
    });
    dispatch(getUserNotebooks());
  } catch (err) {
    throw err;
  }
};

// Create Note
export const createNote = ({ title, content }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ title, content });

  try {
    const res = await axios.post('/api/note', body, config);

    dispatch({
      type: CREATE_NOTE,
      payload: res.data,
    });
    dispatch(getUserNotes());
    dispatch(setAlert('Note Saved!', 'success'));
    dispatch(setNote(res.data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Delete Note
export const deleteNote = (note_id) => async dispatch => {
  try {
    await axios.delete('/api/note/' + note_id);

    dispatch({
      type: DELETE_NOTE
    });
    dispatch(setAlert('Note Deleted', 'danger'));
    dispatch(getUserNotes());
  } catch (err) {
    console.error(err.message);
  }
};

// Organize Note
export const organizeNote = (note_id, notebook_id) => async dispatch => {
  try {
    await axios.put('/api/note/organize/' + note_id + '/' + notebook_id);

    dispatch({
      type: ORGANIZE_NOTE
    });

    dispatch(getUserNotebooks());
  } catch (err) {
    console.error(err.message);
  }
};

