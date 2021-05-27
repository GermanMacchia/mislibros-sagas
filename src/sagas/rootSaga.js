import { takeLatest, all } from 'redux-saga/effects'
import { handleGetLogin } from './handlers/loginHand'
import { handleGetLibros } from './handlers/librosHand'
import { handleGetCategorias } from './handlers/categoriasHand'
import { handleGetPersonas } from './handlers/personasHand'
import { GET_CATEGORIAS, GET_LIBROS, GET_PERSONA, LOGIN } from './types'

export default function* rootSaga() {
   yield all([
       watchUser(),
       watchLibros(),
       watchCategorias(),
       watchPersonas()
   ])
}
//Watchers
function* watchUser(){
    yield takeLatest(LOGIN, handleGetLogin) 
}

function* watchLibros(){
    yield takeLatest(GET_LIBROS, handleGetLibros) 
}

function* watchPersonas(){
    yield takeLatest(GET_PERSONA, handleGetPersonas) 
}

function* watchCategorias(){
    yield takeLatest(GET_CATEGORIAS, handleGetCategorias) 
}