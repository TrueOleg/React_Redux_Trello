import { combineReducers } from 'redux';
import auth from './loginUser';
import boards from './boards';
import users from './users';
import tasks from './tasks';

const rootReducer = combineReducers({
    auth,
    boards,
    tasks,
    users
});

export default rootReducer;