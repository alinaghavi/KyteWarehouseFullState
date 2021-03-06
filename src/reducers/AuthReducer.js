import {
    APIKEY_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
    apiKey: '',
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APIKEY_CHANGED:
            return {...state, apiKey: action.payload};
        case LOGIN_USER:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
        case LOGIN_USER_FAIL:
            return {...state, error: 'Authentication Failed.', loading: false};
        default:
            return state;
    }
};
