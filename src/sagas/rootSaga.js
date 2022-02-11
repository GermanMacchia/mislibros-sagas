import { takeLatest, all } from 'redux-saga/effects'
import { handleGetLogin, handleRegister } from './handlers/loginHand'
import { handleGetLibros, handleDeleteLibro, handlePostLibro, handlePutLibro } from './handlers/librosHand'
import { handleGetCategorias, handlePostCategorias, handleDeleteCategorias } from './handlers/categoriasHand'
import { handleGetPersonas, handleDeletePersonas, handlePostPersonas, handlePutPersona } from './handlers/personasHand'
import { 
    DELETE_CATEGORIAS,
    DELETE_LIBROS, 
    GET_CATEGORIAS, 
    GET_LIBROS, 
    GET_PERSONA, 
    LOGIN, 
    POST_CATEGORIAS, 
    POST_LIBROS, 
    REGISTER, 
    UPDATE_LIBROS,
    DELETE_PERSONA,
    POST_PERSONA,
    UPDATE_PERSONA
} from './types'

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
    yield takeLatest(REGISTER, handleRegister)
}

function* watchLibros(){
    yield takeLatest(GET_LIBROS, handleGetLibros)
    yield takeLatest(DELETE_LIBROS, handleDeleteLibro)
    yield takeLatest(POST_LIBROS, handlePostLibro)
    yield takeLatest(UPDATE_LIBROS, handlePutLibro)   
}

function* watchPersonas(){
    yield takeLatest(GET_PERSONA, handleGetPersonas) 
    yield takeLatest(DELETE_PERSONA, handleDeletePersonas) 
    yield takeLatest(POST_PERSONA, handlePostPersonas)     
    yield takeLatest(UPDATE_PERSONA, handlePutPersona)
}

function* watchCategorias(){
    yield takeLatest(GET_CATEGORIAS, handleGetCategorias) 
    yield takeLatest(POST_CATEGORIAS, handlePostCategorias)
    yield takeLatest(DELETE_CATEGORIAS, handleDeleteCategorias)
}