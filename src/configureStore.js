import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import librosReducer from './sagas/reducers/librosReducer'
import personaReducer from './sagas/reducers/personasReducer'
import categoriaReducer from './sagas/reducers/categoriasReducer'
import userReducer from './sagas/reducers/userReducer'
import rootSaga from './sagas/rootSaga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers( {
    libros: librosReducer,
    user: userReducer,
    persona: personaReducer,
    categoria: categoriaReducer
} )


export default function generateStore () {
    const store = createStore(
        rootReducer,
        composeEnhancers( applyMiddleware( sagaMiddleware ) )
    )
    sagaMiddleware.run( rootSaga )

    return store
}

