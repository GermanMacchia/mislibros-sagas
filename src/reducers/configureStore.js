import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import librosReducer from './librosDuck';
import personaReducer from './personaDuck';
import categoriaReducer from './categoriaDuck';
import userReducer from './userDuck'
import userSaga from '../sagas/userDuck'
import rootSaga from '../sagas/rootSaga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();



const rootReducer = combineReducers({
    libros: librosReducer,
	user: userReducer,
    persona: personaReducer,
    categoria: categoriaReducer,
    saga: userSaga
})


export default function generateStore(){
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);

    return store
}

