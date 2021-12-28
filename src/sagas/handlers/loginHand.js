import { call, put, select } from 'redux-saga/effects'
import { reqLogin } from '../requests/loginReq'
import { LOGIN_ERROR, LOGIN_SUCCESS } from '../types'

export function* handleGetLogin() {
    
    try {
        const { user } = yield select(state => state.user);
        const  { data }  = yield call(reqLogin, user);
        yield put({ type: LOGIN_SUCCESS, payload: data.token} );
    } catch (error){
        yield put({ type: LOGIN_ERROR, error: error.response.data.error})
    }
    
}
