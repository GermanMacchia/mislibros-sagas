import { call, put, select } from 'redux-saga/effects'
import { reqGetCategorias, reqPostCategorias, reqDeleteCategorias } from '../requests/categoriasReq'
import {
    GET_CATEGORIAS_ERROR,
    GET_CATEGORIAS_SUCCESS,
    POST_CATEGORIAS_SUCCESS,
    POST_CATEGORIAS_ERROR,
    DELETE_CATEGORIAS_SUCCESS,
    DELETE_CATEGORIAS_ERROR,
    TOAST,
    GET_CATEGORIAS
} from '../types'



export function* handleGetCategorias() {

    try {
        const { user } = yield select(state => state.user)
        const { data } = yield call(reqGetCategorias, user)
        yield put({ type: GET_CATEGORIAS_SUCCESS, payload: data.respuesta })
    } catch (error) {
        yield put({ type: GET_CATEGORIAS_ERROR, error: error })
    }

}

export function* handlePostCategorias() {

    try {
        const { user } = yield select(state => state.user)
        const { props } = yield select(state => state.categoria)
        const { data } = yield call(reqPostCategorias, user, props)
        yield put({ type: POST_CATEGORIAS_SUCCESS, props: data })
        yield put({
            type: TOAST,
            info: {
                severity: 'success',
                summary: 'Categoria Creada',
                detail: data.Nombre
            }
        })
        yield put({ type: GET_CATEGORIAS })

    } catch (error) {
        yield put({ type: POST_CATEGORIAS_ERROR, error: error.response.data.error })
        yield put({
            type: TOAST,
            info: {
                severity: 'error',
                summary: 'Error al Crear Categoria',
                detail: error.response.data.error
            }
        })
    }
}


export function* handleDeleteCategorias() {

    try {
        const { user } = yield select(state => state.user)
        const { props } = yield select(state => state.categoria)
        const { data } = yield call(reqDeleteCategorias, user, props)
        yield put({ type: DELETE_CATEGORIAS_SUCCESS, payload: data.respuesta })
        yield put({
            type: TOAST,
            info: {
                severity: 'success',
                summary: 'Categoria Borrada',
                detail: data.respuesta
            }
        })
        yield put({ type: GET_CATEGORIAS })
    } catch (error) {
        yield put({ type: DELETE_CATEGORIAS_ERROR, error: error.response.data.error })
        yield put({
            type: TOAST,
            info: {
                severity: 'error',
                summary: 'Imposible borrar categoria',
                detail: error.response.data.error
            }
        })
    }

}