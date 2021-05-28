import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import librosReducer from './sagas/librosDuck';
import personaReducer from './reducers/personaDuck';
import categoriaReducer from './reducers/categoriaDuck';
import userReducer from './sagas/userDuck'
import rootSaga from './sagas/rootSaga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    libros: librosReducer,
	user: userReducer,
    persona: personaReducer,
    categoria: categoriaReducer
})


export default function generateStore(){
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);

    return store
}

