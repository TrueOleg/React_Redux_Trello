import * as Const from '../constants';

const initialState = {
  secret: ''
};

export default (state = initialState, action) => {
    const { type, secret } = action;
    switch (type) {
        
        case Const.SAVE_SECRET:
            
            return { ...state, secret: secret };
            
        
        
    
        default:
            return state;
    }
};