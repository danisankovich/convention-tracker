import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import conventionReducer from './convention_reducer';
const rootReducer = combineReducers({
  form,
  auth: authReducer,
  convention: conventionReducer,
});

export default rootReducer;
