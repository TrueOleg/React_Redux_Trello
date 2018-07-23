import * as Const from '../constants';

const initialState = {
  myBoards: []
};

export default (state = initialState, action) => {
    const { type, boards } = action;
    console.log('boards', boards);
    switch (type) {
        
        case Const.SAVE_MY_BOARDS:
            
            return { ...state, myBoards: boards };
            
        
        
    
        default:
            return state;
    }
};