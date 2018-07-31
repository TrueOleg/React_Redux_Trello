import * as Api from '../../servises/Api';
import * as Const from '../constants';

export const saveMyBackLogTasks = (tasks) => {
  return {
      type: Const.SAVE_MY_BACKLOG_TASKS,
      tasks
  };
};  

export const saveMyDoneTasks = (tasks) => {
    return {
        type: Const.SAVE_MY_DONE_TASKS,
        tasks
    };
};  

export const saveMyToDoTasks = (tasks) => {
    return {
        type: Const.SAVE_MY_TODO_TASKS,
        tasks
    };
};  

export const getTasks = (boardId, status) => {
    return (dispatch) => {
        switch(status) {
            case 'backLog': Api.get(`${Const.URL}/tasks/my?board_id=${boardId}&status=${status}`)
                .then(res => {
                  dispatch(saveMyBackLogTasks(res.data.tasks));
                    
                })
                .catch(() => dispatch(loginHasErrored(true)));
                break;
            case 'done': Api.get(`${Const.URL}/tasks/my?board_id=${boardId}&status=${status}`)
                .then(res => {
                dispatch(saveMyDoneTasks(res.data.tasks));
                    
                })
                .catch(() => dispatch(loginHasErrored(true))); 
                break;
            case 'todo': Api.get(`${Const.URL}/tasks/my?board_id=${boardId}&status=${status}`)
                .then(res => {
                dispatch(saveMyToDoTasks(res.data.tasks));
                    
                })
                .catch(() => dispatch(loginHasErrored(true))); 
                break;       
        }
        
    };
};

export const writeTask = (data, status, boardId) => {
    return (dispatch) => {
 
        Api.post(`${Const.URL}/tasks/`, {data, status, boardId})
            .then(res => {
              dispatch(getTasks(boardId, status ));
                
            })
            .catch(() => dispatch(loginHasErrored(true)));
            
        
                
    };
};