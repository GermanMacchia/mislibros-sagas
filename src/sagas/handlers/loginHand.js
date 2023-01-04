import { call, put, select } from 'redux-saga/effects'
import { reqLogin, reqRegister } from '../requests/loginReq'
import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    TOAST, REDIRECT,
    REDIRECT_SUCCESS
} from '../types'


export function* handleGetLogin () {

    try {
        const { user } = yield select( state => state.user )
        const { data } = yield call( reqLogin, user )
        yield put( { type: LOGIN_SUCCESS, payload: data.token } )
        localStorage.storage = JSON.stringify( { user: data.token } )
        yield put( { type: REDIRECT, page: '/home' } )
        yield put( { type: REDIRECT_SUCCESS } )

    } catch( error ) {
        yield put( { type: LOGIN_ERROR, error: error.response.data.error } )
        yield put( {
            type: TOAST,
            info: {
                severity: 'error',
                summary: 'Error Login',
                detail: error.response.data.error
            }
        } )
    }

}

export function* handleRegister () {

    try {
        const { user } = yield select( state => state.user )
        yield call( reqRegister, user )
        document.getElementById( 'myform' ).reset()
        yield put( { type: REGISTER_SUCCESS } )
        yield put( {
            type: TOAST,
            info: {
                severity: 'success',
                summary: 'Registro Exitoso',
                detail: ""
            }
        } )
    } catch( error ) {
        yield put( { type: REGISTER_ERROR, error: error.response.data.message } )
        yield put( {
            type: TOAST,
            info: {
                severity: 'error',
                summary: 'Error Registro',
                detail: error.response.data.message
            }
        } )
    }

}
