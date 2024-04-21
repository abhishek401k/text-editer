import { NEW_NOTE } from './types';

// clear inputs for new note
export const newNote = () => dispatch => {
  dispatch({
    type: NEW_NOTE
  });
};