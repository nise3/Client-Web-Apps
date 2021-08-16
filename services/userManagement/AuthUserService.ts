import {apiGet, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";
import localSD from "../../common/localSD";
import {authLoginSuccess} from "../../context/auth/authActionCreators";
import {apiMockGet} from "../../common/apiMock";

export const putAuthUserToLocalSD = async (userDetails: any) => {
    try {
        return await localSD.setItem('authUser', userDetails)
    } catch (error) {
        console.log('putUserToLocalSD', error)
    }
};

export const getAuthUserFromLocalSD = async () => {
    try {
        return await localSD.getItem('authUser')
    } catch (error) {
        console.log('getUserFromLocalSD', error)
    }
};

export const loginUser = async (dispatch: any, userCredentials: any) => {
    try {
        //TODO: login api call
        let authUser = await getAuthUser();
        await putAuthUserToLocalSD(authUser);
        dispatch(authLoginSuccess(authUser));
        return authUser;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getAuthUser = async () => {
    try {
        let response: any = await apiMockGet('auth-user');
        console.log(`getAuthUser`,response);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateUser = async (userId: number, data: Object) => {
    try {
        let response: any = await apiPut('auth-user', data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};