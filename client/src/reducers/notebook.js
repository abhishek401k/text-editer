import { CREATE_NOTEBOOK, SET_NOTEBOOK, DELETE_NOTEBOOK } from '../actions/types';

const initialState = {
  title: '',
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTEBOOK:
      return {
        ...state,
        title: action.payload.title,
      };
    case SET_NOTEBOOK:
      return {
        ...state,
        title: action.payload.title,
        id: action.payload._id
      };
    case DELETE_NOTEBOOK:
      return {
        ...state,
        title: ''
      };
    default:
      return {
        ...state,
        title: ''
      };
  }
};

