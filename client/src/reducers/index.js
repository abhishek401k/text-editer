import { combineReducers } from 'redux';

import auth from './auth';
import alert from './alert';
import note from './note';
import newNote from './newNote';
import userNotes from './userNotes';
import notebook from './notebook';
import userNotebooks from './userNotebooks';

export default combineReducers({
  auth,
  alert,
  note,
  newNote,
  userNotes,
  notebook,
  userNotebooks
});