import { CREATE_NOTE, LOGOUT, SET_NOTE, NEW_NOTE, DELETE_NOTE } from '../actions/types';

const initialState = {
  title: '',
  content: null,
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return {
        ...state,
        title: action.payload.title,
        content: action.payload.content
      };
    case DELETE_NOTE:
      return {
        ...state,
        title: '',
        content: null,
        id: null
      };
    case SET_NOTE:
      return {
        ...state,
        title: action.payload.title,
        content: action.payload.content,
        id: action.payload._id
      };
    case NEW_NOTE:
      return {
        ...state,
        title: '',
        content: null,
        id: null
      };
    case LOGOUT:
      return {
        ...state,
        title: '',
        content: null
      };
    default:
      return {
        ...state,
      };
  }
};