import { call, put, select } from 'redux-saga/effects'
import { requestLogin } from '../requests/loginReq'
import { LOGIN_SUCCESS } from '../types'

export function* handleGetLogin() {
    
    try {
        const { user } = yield select(state => state.user);
        const  { data }  = yield call(requestLogin, user);
        yield put({ type:LOGIN_SUCCESS, payload: data.token} );
    } catch (error){
        console.log(error)
    }

}