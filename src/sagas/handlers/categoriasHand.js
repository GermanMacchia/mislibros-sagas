import { call, put, select } from 'redux-saga/effects'
import { reqGetCategorias } from '../requests/categoriasReq'
import { GET_CATEGORIAS_ERROR, GET_CATEGORIAS_SUCCESS } from '../types'

export function* handleGetCategorias() {
    
    try {
        const { user } = yield select(state => state.user)
        const  { data }  = yield call(reqGetCategorias, user)
        yield put({ type: GET_CATEGORIAS_SUCCESS, payload: data.respuesta} )
    } catch (error){
        yield put({ type: GET_CATEGORIAS_ERROR, error: error})
        console.log(error)
    }

}