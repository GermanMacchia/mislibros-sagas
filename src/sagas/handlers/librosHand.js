import { call, put, select } from 'redux-saga/effects'
import { reqGetLibros } from '../requests/librosReq'
import { GET_LIBROS_ERROR, GET_LIBROS_SUCCESS } from '../types'

export function* handleGetLibros() {
    
    try {
        const { user } = yield select(state => state.user)
        const  { data }  = yield call(reqGetLibros, user)
        yield put({ type:GET_LIBROS_SUCCESS, payload: data.respuesta} )
    } catch (error){
        yield put({ type: GET_LIBROS_ERROR, error: error })
    }
}