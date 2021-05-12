import axios from 'axios';
//URL
const url = `https://mis-libros-bck.herokuapp.com/`;
//CONSTANTES
//GET CATEGORIAS
const GET_CATEGORIAS = "GET_CATEGORIAS"
const GET_CATEGORIAS_ERROR = "GET_CATEGORIAS_ERROR";
const GET_CATEGORIAS_SUCCESS = "GET_CATEGORIAS_SUCCESS";

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
        case GET_CATEGORIAS:
            return {
                ...state,
                fetching:true
            }
        case GET_CATEGORIAS_SUCCESS:
            return {
                ...state,
                fetching:false,
                loaded: true,
                payload: action.payload
            }
        case GET_CATEGORIAS_ERROR:
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

//ACTIONS

export const getCategoriasAction = () => {
//GET CATEGORIA
    return async (dispatch, getState) => {
        const auth =  {'Authorization': getState().user.user}
        dispatch({
            type: GET_CATEGORIAS
        })
        const res = await axios.get(url + `categoria`, {headers: auth})
        console.log(res)
        if(res.status === 200){
        dispatch({
            type: GET_CATEGORIAS_SUCCESS,
            payload: res.data.respuesta
        })
        }else{
        dispatch({
            type: GET_CATEGORIAS_ERROR,
            error: res.error
        })
        }
    }
}