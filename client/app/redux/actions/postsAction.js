import * as Api from '../../servises/Api';
import * as Const from '../constants';


export const saveMyPosts = (posts) => {
    return {
        type: Const.SAVE_MY_POSTS,
        posts
    };
};  

export const getMyPosts = () => {
    return (dispatch) => {
        
        Api.get(`${Const.URL}/posts/my`)
            .then(res => {
                
                dispatch(saveMyPosts(res.data.posts));
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};

export const saveFriendsPosts = (posts) => {
    return {
        type: Const.SAVE_FRIENDS_POSTS,
        posts
    };
};  

export const getFriendsPosts = () => {
    return (dispatch) => {
        
        Api.get(`${Const.URL}/posts/friends`)
            .then(res => {
                console.log('res', res);
                dispatch(saveFriendsPosts(res.data.posts));
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};

export const writePost = (data) => {
    return (dispatch) => {

        Api.post(`${Const.URL}/posts/`, data)
            .then(res => {
                console.log('res', res);
                
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
};
