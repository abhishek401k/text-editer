import { GET_USER_NOTES, LOGOUT } from '../actions/types';

const initialState = {
  notes: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        notes: null
      };
    default:
      return state;
  }
};

// We're fetching titles right now...