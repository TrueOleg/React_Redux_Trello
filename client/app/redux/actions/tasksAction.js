import * as Api from '../../servises/Api';
import * as Const from '../constants';

export const saveMyTasks = (tasks) => {
  return {
      type: Const.SAVE_MY_TASKS,
      tasks
  };
};  

export const getTasks = () => {
    return (dispatch) => {
 
        Api.get(`${Const.URL}/tasks/my`)
            .then(res => {
              dispatch(saveMyBoards(res.data.tasks));
                
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};

export const writeTasks = (data) => {
    return (dispatch) => {
 
        Api.post(`${Const.URL}/tasks/`, data)
            .then(res => {
              dispatch(saveMyBoards(res.data.tasks));
                
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};