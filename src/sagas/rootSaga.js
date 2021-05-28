import { takeLatest, all } from 'redux-saga/effects'
import { handleGetLogin } from './handlers/loginHand'
import { handleGetLibros, handleDeleteLibro, handlePostLibro } from './handlers/librosHand'
import { handleGetCategorias } from './handlers/categoriasHand'
import { handleGetPersonas } from './handlers/personasHand'
import { DELETE_LIBROS, GET_CATEGORIAS, GET_LIBROS, GET_PERSONA, LOGIN, POST_LIBROS } from './types'

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
    yield takeLatest(DELETE_LIBROS, handleDeleteLibro)
    yield takeLatest(POST_LIBROS, handlePostLibro) 
}

function* watchPersonas(){
    yield takeLatest(GET_PERSONA, handleGetPersonas) 
}

function* watchCategorias(){
    yield takeLatest(GET_CATEGORIAS, handleGetCategorias) 
}