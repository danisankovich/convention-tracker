import {
  FETCH_CONVENTIONS, FETCH_MY_CONVENTIONS, FETCH_SINGLE_CONVENTION, NEW_CONVENTION, EDIT_CONVENTION
} from '../actions/types';
export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_CONVENTIONS:
      return {...state, conventions: action.payload};
    case FETCH_MY_CONVENTIONS:
      return {...state, myconventions: action.payload};
    case FETCH_SINGLE_CONVENTION:
      return {...state, convention: action.payload};
    case NEW_CONVENTION:
      return {...state, convention: action.payload};
    case EDIT_CONVENTION:
      return {...state, convention: action.payload};
  }
  return state;
}
