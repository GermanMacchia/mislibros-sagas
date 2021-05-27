import { GET_PERSONA, GET_PERSONA_ERROR, GET_PERSONA_SUCCESS } from './types'

//INITIAL DATA
const initialData = {
    fetching: false,
    loaded: false,
    posting: false,
    updating: false,
    deleting: false,
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
        default:
            return {
                ...state
            }
    }
}