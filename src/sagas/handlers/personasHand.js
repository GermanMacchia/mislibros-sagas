import { call, put, select } from 'redux-saga/effects'
import { reqGetPersonas, reqDeletePersonas, reqPostPersonas } from '../requests/personasReq'
import { 
    GET_PERSONA_ERROR, 
    GET_PERSONA_SUCCESS, 
    DELETE_PERSONA_ERROR, 
    DELETE_PERSONA_SUCCESS,
    POST_PERSONA_ERROR,
    POST_PERSONA_SUCCESS, 
    TOAST, 
    GET_PERSONA } from '../types'


export function* handleGetPersonas() {
    
    try {
        const { user } = yield select(state => state.user)
        const  { data }  = yield call(reqGetPersonas, user)
        yield put({ type: GET_PERSONA_SUCCESS, payload: data.respuesta} )
    } catch (error){
        yield put({ type: GET_PERSONA_ERROR, error: error})
    }

}

export function* handleDeletePersonas() {
    
    try {
        const { user } = yield select(state => state.user)
        const   props  = yield select(state => state.persona.props)
        const  { data }  = yield call(reqDeletePersonas, user, props)
        yield put({ type: DELETE_PERSONA_SUCCESS, payload: data.respuesta} )
        yield put({type: GET_PERSONA })
    } catch (error){
        yield put({ type: DELETE_PERSONA_ERROR, error: error})
    }

}

export function* handlePostPersonas() {

    try {
        const { user }   = yield select(state => state.user)
        const   props    = yield select(state => state.persona.props)
        const respuesta  = yield call(reqPostPersonas, user, props)
        yield put({ type:POST_PERSONA_SUCCESS, payload: respuesta} )
        yield put({ type: GET_PERSONA })
    } catch (error) {
        yield put({ type: POST_PERSONA_ERROR, error: error.response.data.error})
        yield put({
            type:TOAST, 
            info: { 
                severity: 'error', 
                summary: 'Error', 
                detail: error.response.data.error
            }          
        })
    }

}