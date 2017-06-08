import {
  FETCH_GROUPS, FETCH_SINGLE_GROUP, NEW_GROUP, EDIT_GROUP, JOIN_GROUP, LEAVE_GROUP
} from '../actions/types';
export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_GROUPS:
      return {...state, groups: action.payload};
    case FETCH_SINGLE_GROUP:
      return {...state, group: action.payload};
    case NEW_GROUP:
      return {...state, group: action.payload};
    case EDIT_GROUP:
      return {...state, group: action.payload};
    case JOIN_GROUP:
      return {...state, group: action.payload};
    case LEAVE_GROUP:
      return {...state, group: action.payload};
  }
  return state;
}
