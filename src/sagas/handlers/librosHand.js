import { call, put, select } from 'redux-saga/effects'
import { reqGetLibros, reqDeleteLibros, reqPostLibros, reqPutLibros } from '../requests/librosReq'
import {
    DELETE_LIBROS_ERROR,
    DELETE_LIBROS_SUCCESS,
    GET_LIBROS,
    GET_LIBROS_ERROR,
    GET_LIBROS_SUCCESS,
    POST_LIBROS_ERROR,
    POST_LIBROS_SUCCESS,
    UPDATE_LIBROS_ERROR,
    UPDATE_LIBROS_SUCCESS,
    TOAST
} from '../types'


export function* handleGetLibros () {

    try {
        const { user } = yield select( state => state.user )
        const { data } = yield call( reqGetLibros, user )
        yield put( { type: GET_LIBROS_SUCCESS, payload: data.respuesta } )

    } catch( error ) {
        yield put( { type: GET_LIBROS_ERROR, error: error } )
    }

}

export function* handleDeleteLibro () {

    try {
        const { user } = yield select( state => state.user )
        const { props } = yield select( state => state.libros.deleting )
        const { data } = yield call( reqDeleteLibros, user, props )
        yield put( { type: DELETE_LIBROS_SUCCESS, payload: data.respuesta } )
        yield put( { type: GET_LIBROS } )
        yield put( {
            type: TOAST,
            info: {
                severity: 'success',
                summary: 'Libro Eliminado',
                detail: data.respuesta
            }
        } )

    } catch( error ) {
        yield put( { type: DELETE_LIBROS_ERROR, error: error } )
        yield put( {
            type: TOAST,
            info: {
                severity: 'error',
                summary: 'Error',
                detail: error.response.data.error
            }
        } )
    }

}

export function* handlePutLibro () {

    try {
        const { user } = yield select( state => state.user )
        const { props } = yield select( state => state.libros.updating )
        const respuesta = yield call( reqPutLibros, user, props )
        yield put( { type: UPDATE_LIBROS_SUCCESS, payload: respuesta } )
        yield put( { type: GET_LIBROS } )
    } catch( error ) {
        yield put( { type: UPDATE_LIBROS_ERROR, error: error } )
    }

}

export function* handlePostLibro () {

    try {
        const { user } = yield select( state => state.user )
        const { props } = yield select( state => state.libros.posting )
        const respuesta = yield call( reqPostLibros, user, props )
        yield put( { type: POST_LIBROS_SUCCESS, payload: respuesta } )
        yield put( { type: GET_LIBROS } )
    } catch( error ) {
        yield put( { type: POST_LIBROS_ERROR, error: error.response.data.error } )
    }

}