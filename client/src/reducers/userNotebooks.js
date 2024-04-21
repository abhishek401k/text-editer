import { GET_USER_NOTEBOOKS } from '../actions/types';

const initialState = {
  notebooks: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_NOTEBOOKS:
      return {
        ...state,
        notebooks: action.payload
      };
    default:
      return state;
  }
};