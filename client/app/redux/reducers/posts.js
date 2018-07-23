import * as Const from '../constants';

const initialState = { myPosts: [],
                       friendsPosts: [] 
                     };

export default (state = initialState, action) => {
    const { type, posts } = action;
    console.log('posts', posts)
    switch (type) {
        
        case Const.SAVE_MY_POSTS:
            
            return { ...state, myPosts: posts };
            
        case Const.SAVE_FRIENDS_POSTS:
        
            return { ...state, friendsPosts: posts };
        
    
        default:
            return state;
    }
};