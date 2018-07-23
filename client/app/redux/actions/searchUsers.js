import debounceAction from 'debounce-action';

import * as Api from '../../servises/Api';
import * as Const from '../constants';

export const errored = (data) => {
    return {
        type: Const.SAVE_MY_POSTS,
        data
    };
};  

export const saveUsers = (users, data) => {
    return {
        type: Const.SAVE_USERS,
        users,
        data
    };
}; 

export const clearUsers = () => {
    return {
        type: Const.CLEAR_USERS,
    };
}; 

export const searchUsers = (data) => {
    return (dispatch) => {
        if (data === '') {
            dispatch(clearUsers());
        } else {
            Api.get(`${Const.URL}/users/search?char=${data}`)
                .then(res => {
                    
                    dispatch(saveUsers(res.data.users, data));
                })
                .catch(() => dispatch(errored(true)));
        }
    };
};

export const searchUsersDebounced = debounceAction(searchUsers, 1000);

export const subscribe = (id, char) => {
    return (dispatch) => {
        
            Api.post(`${Const.URL}/followers?id=${id}`)
                .then(res => {
                    console.log('res', res);
                    dispatch(searchUsers(char));
                })
                .catch(() => dispatch(errored(true)));
        
    };
};

export const unsubscribe = (id, char) => {
    return (dispatch) => {
        
            Api.del(`${Const.URL}/followers?id=${id}`)
                .then(res => {
                    console.log('res', res);
                    dispatch(searchUsers(char));
                })
                .catch(() => dispatch(errored(true)));
        
    };
};