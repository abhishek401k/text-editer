import { CREATE_NOTEBOOK, GET_USER_NOTEBOOKS, SET_NOTEBOOK, DELETE_NOTEBOOK } from './types';
import axios from 'axios';

import { setAlert } from './alert';

// Get logged in user's notebooks
export const getUserNotebooks = () => async dispatch => {
  try {
    const res = await axios.get('/api/notebook/myNotebooks');

    dispatch({
      type: GET_USER_NOTEBOOKS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Create Notebook
export const createNotebook = ({ title }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ title });

  try {
    const res = await axios.post('/api/notebook', body, config);

    dispatch({
      type: CREATE_NOTEBOOK,
      payload: res.data
    });
    dispatch(getUserNotebooks());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Set Notebook in Redux
export const setNotebook = (notebook) => async dispatch => {
  dispatch({
    type: SET_NOTEBOOK,
    payload: notebook
  });
};

// Delete user's notebook
export const deleteNotebook = (notebook_id) => async dispatch => {
  try {
    await axios.delete('/api/notebook/' + notebook_id);

    dispatch({
      type: DELETE_NOTEBOOK
    });
    dispatch(setAlert('Notebook Deleted', 'danger'));
    dispatch(getUserNotebooks());
  } catch (err) {
    console.error(err.message);
  }
};