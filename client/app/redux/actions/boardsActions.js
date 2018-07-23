import * as Api from '../../servises/Api';
import * as Const from '../constants';

export const saveMyBoards = (boards) => {
  return {
      type: Const.SAVE_MY_BOARDS,
      boards
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
