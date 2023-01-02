import {
    GET_LIBROS,
    GET_LIBROS_ERROR,
    GET_LIBROS_SUCCESS,
    DELETE_LIBROS,
    DELETE_LIBROS_ERROR,
    DELETE_LIBROS_SUCCESS,
    UPDATE_LIBROS,
    UPDATE_LIBROS_ERROR,
    UPDATE_LIBROS_SUCCESS,
    POST_LIBROS,
    POST_LIBROS_ERROR,
    POST_LIBROS_SUCCESS
} from '../types'

//INITIAL DATA
const initialData = {
    fetching: false,
    loaded: false,
    posting: null,
    updating: null,
    deleting: null,
    error: [],
    reducerChanges: []
}

//REDUCER
export default function reducer(state = initialData, action) {
    switch (action.type) {
        //GETLIBROS
        case GET_LIBROS:
            return {
                ...state,
                fetching: true,
                loaded: false
            }
        case GET_LIBROS_ERROR:
            return {
                ...state,
                fetching: false,
                error: [...state.error, action.error]
            }
        case GET_LIBROS_SUCCESS:
            return {
                ...state,
                fetching: false,
                loaded: true,
                payload: action.payload
            }

        //DELETE LIBROS
        case DELETE_LIBROS:
            return {
                ...state,
                deleting: {
                    status: true,
                    props: action.props
                }
            }
        case DELETE_LIBROS_ERROR:
            return {
                ...state,
                deleting: null,
                error: [...state.error, action.payload]
            }
        case DELETE_LIBROS_SUCCESS:
            return {
                ...state,
                deleting: null,
                reducerChanges: [...state.reducerChanges, action.payload]
            }

        //UPDATE LIBROS
        case UPDATE_LIBROS:
            return {
                ...state,
                updating: {
                    status: true,
                    props: action.props
                }
            }
        case UPDATE_LIBROS_ERROR:
            return {
                ...state,
                updating: null,
                error: [...state.error, action.error]
            }
        case UPDATE_LIBROS_SUCCESS:
            return {
                ...state,
                updating: null,
                reducerChanges: [...state.reducerChanges, action.payload]
            }

        //POST LIBROS
        case POST_LIBROS:
            return {
                ...state,
                posting: {
                    status: true,
                    props: action.props
                }
            }
        case POST_LIBROS_ERROR:
            return {
                ...state,
                posting: null,
                error: [...state.error, action.error]
            }
        case POST_LIBROS_SUCCESS:
            return {
                ...state,
                posting: null,
                reducerChanges: [...state.reducerChanges, action.payload]
            }

        //DEFAULT
        default:
            return {
                ...state
            }
    }
}