import { call, put, select } from 'redux-saga/effects'
import { reqGetPersonas } from '../requests/personasReq'
import { GET_PERSONA_ERROR, GET_PERSONA_SUCCESS } from '../types'


export function* handleGetPersonas() {
    
    try {
        const { user } = yield select(state => state.user)
        const  { data }  = yield call(reqGetPersonas, user)
        yield put({ type: GET_PERSONA_SUCCESS, payload: data.respuesta} )
    } catch (error){
        yield put({ type: GET_PERSONA_ERROR, error: error})
    }

}