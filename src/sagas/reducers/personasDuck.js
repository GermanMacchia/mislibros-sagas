import { 
    GET_PERSONA, 
    GET_PERSONA_ERROR, 
    GET_PERSONA_SUCCESS,
    DELETE_PERSONA,
    DELETE_PERSONA_ERROR,
    DELETE_PERSONA_SUCCESS,
    POST_PERSONA,
    POST_PERSONA_SUCCESS,
    POST_PERSONA_ERROR } from '../types'

//INITIAL DATA
const initialData = {
    fetching: false,
    loaded: false,
    posting: false,
    updating: false,
    deleting: false,
    props: null,
    reducerChanges: [] 
}
//REDUCER
export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_PERSONA:
            return {
                ...state,
                fetching:true
            }
        case GET_PERSONA_SUCCESS:
            return {
                ...state,
                fetching:false,
                loaded: true,
                payload: action.payload
            }
        case GET_PERSONA_ERROR:
            return {
                ...state,
                fetchin: false,
                error: action.error
            }
        case DELETE_PERSONA:
            return {
                ...state,
                deleting:true,
                props: action.props
            }
        case DELETE_PERSONA_SUCCESS:
            return {
                ...state,
                deleting: false,
                props: null
            }
        case DELETE_PERSONA_ERROR:
            return {
                ...state,
                deleting: false,
                props: null
            }
        case POST_PERSONA:
            return {
                ...state,
                posting:true,
                props: action.props
            }
        case POST_PERSONA_SUCCESS:
            return {
                ...state,
                posting: false,
                props: null
            }
        case POST_PERSONA_ERROR:
            return {
                ...state,
                posting: false,
                props: null
            }
        default:
            return {
                ...state
            }
    }
}