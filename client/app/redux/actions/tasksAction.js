import * as Api from '../../servises/Api';
import * as Const from '../constants';

export const saveMyTasks = (tasks) => {
  return {
      type: Const.SAVE_MY_TASKS,
      tasks
  };
};  

export const getTasks = (boardId, status) => {
    return (dispatch) => {
 
        Api.get(`${Const.URL}/tasks/my?board_id=${boardId}&status=${status}`)
            .then(res => {
            //   dispatch(saveMyBoards(res.data.tasks));
                
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};

export const writeTask = (data, status, id) => {
    return (dispatch) => {
 
        Api.post(`${Const.URL}/tasks/`, {data, status, id})
            .then(res => {
              dispatch(saveMyBoards(res.data.tasks));
                
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};