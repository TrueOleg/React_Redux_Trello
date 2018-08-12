import * as Api from '../../servises/Api';
import * as Const from '../constants';

export const saveMyBoards = (boards) => {
  return {
      type: Const.SAVE_MY_BOARDS,
      boards
  };
}; 

export const saveSecret = (secret) => {
    return {
        type: Const.SAVE_SECRET,
        secret
    };
  };  
  

export const getBoards = () => {
    return (dispatch) => {
 
        Api.get(`${Const.URL}/boards/my`)
            .then(res => {
              dispatch(saveMyBoards(res.data.boards));
                
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};

export const writeBoard = (data) => {
    return (dispatch) => {
 
        Api.post(`${Const.URL}/boards/`, data)
            .then(res => {
              dispatch(saveMyBoards(res.data.boards));
                
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};

export const createHashSecret = (boardId) => {
    return (dispatch) => {
 
        Api.put(`${Const.URL}/boards/`, {boardId})
            .then(res => {
                dispatch(saveSecret(res.data.secretHash));

            })
            .catch(() => dispatch(loginHasErrored(true)));
            
        
                
    };
};