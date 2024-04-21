import { NEW_NOTE } from '../actions/types';

const initialState = {
  new: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_NOTE:
      return {
        ...state,
        new: true
      };
    default:
      return {
        ...state,
        new: false
      };
  }
};