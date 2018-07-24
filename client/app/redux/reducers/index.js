import { combineReducers } from 'redux';
import auth from './loginUser';
import boards from './boards';
import users from './users';

const rootReducer = combineReducers({
    auth,
    boards,
    users
});

export default rootReducer;