import {
    GET_CATEGORIAS,
    GET_CATEGORIAS_ERROR,
    GET_CATEGORIAS_SUCCESS,
    POST_CATEGORIAS,
    DELETE_CATEGORIAS,
    DELETE_CATEGORIAS_ERROR,
    POST_CATEGORIAS_SUCCESS,
    DELETE_CATEGORIAS_SUCCESS
} from '../types'

//INITIAL DATA
const initialData = {
    fetching: false,
    loaded: false,
    posting: false,
    updating: false,
    deleting: false,
    props: [],
    error: [],
    reducerChanges: []
}
//REDUCER
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_CATEGORIAS:
            return {
                ...state,
                fetching: true,
                loaded: false
            }
        case GET_CATEGORIAS_SUCCESS:
            return {
                ...state,
                fetching: false,
                loaded: true,
                payload: action.payload
            }
        case GET_CATEGORIAS_ERROR:
            return {
                ...state,
                fetchin: false,
                error: action.error
            }
        case POST_CATEGORIAS:
            return {
                ...state,
                posting: true,
                props: action.props
            }
        case POST_CATEGORIAS_SUCCESS:
            return {
                ...state,
                posting: false,
                props: action.props
            }
        case DELETE_CATEGORIAS:
            return {
                ...state,
                deleting: true,
                props: action.props,
                loaded: false
            }
        case DELETE_CATEGORIAS_SUCCESS:
            return {
                ...state,
                deleting: false,
                props: [],
                reducerChanges: action.payload
            }
        case DELETE_CATEGORIAS_ERROR:
            return {
                ...state,
                deleting: false,
                props: [],
                error: action.error
            }
        default:
            return {
                ...state
            }
    }
}

