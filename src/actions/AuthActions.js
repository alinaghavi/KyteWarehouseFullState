import {Actions} from 'react-native-router-flux';
import {
    APIKEY_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const apiKeyChanged = (text) => {
    return {
        type: APIKEY_CHANGED,
        payload: text
    };
};

export const loginUser = ({apiKey}) => {

    return (dispatch) => {
        dispatch({type: LOGIN_USER});
        var url = "https://kyte.ir/api/v1/me";
        return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-Api-Key": apiKey,
                   // "X-Api-Key": '1gu93pllj7vo8w000w8sw8w8sogk84wsg4co0gcw8g0kg84480',
                }
            }).then((res) => {
            if (res.status == 200) {
                res.json().then(
                    (userInfo) => {
                        loginUserSuccess(dispatch, userInfo);
                    }
                )
            }
            if (res.status != 200) {
                loginUserFail(dispatch);
            }

        });
    }
};

const loginUserFail = (dispatch) => {
    dispatch({type: LOGIN_USER_FAIL});
};

const loginUserSuccess = (dispatch, userInfo) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: userInfo
    });
    Actions.tabbar();
};
