import * as Const from '../constants';

const initialState = {
  nyTasks: []
};

export default (state = initialState, action) => {
    const { type, tasks } = action;
    console.log('tasks', tasks);
    switch (type) {
        
        case Const.SAVE_MY_TASKS:
            
            return { ...state, myTasks: tasks };
            
        
        
    
        default:
            return state;
    }
};