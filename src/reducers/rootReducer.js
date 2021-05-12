import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import librosReducer from './librosDuck';
import personaReducer from './personaDuck';
import categoriaReducer from './categoriaDuck';
import userReducer from './userDuck'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    libros: librosReducer,
	user: userReducer,
    persona: personaReducer,
    categoria: categoriaReducer
})


export default function generateStore(){
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}