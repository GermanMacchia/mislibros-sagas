/*import axios from 'axios'
import { 
    GET_LIBROS, 
    GET_LIBROS_ERROR, 
    GET_LIBROS_SUCCESS, 
    DELETE_LIBROS, 
    DELETE_LIBROS_SUCCESS, 
    DELETE_LIBROS_ERROR,
    UPDATE_LIBROS, 
    UPDATE_LIBROS_ERROR, 
    UPDATE_LIBROS_SUCCESS, 
    POST_LIBROS, 
    POST_LIBROS_ERROR, 
    POST_LIBROS_SUCCESS } from '../sagas/types'
import { URL } from '../sagas/requests/URL'

//INITIAL DATA
const initialData = {
    fetching: false,
    loaded: false,
    posting: false,
    updating: false,
    deleting: false,
    error: [],
    reducerChanges: [] 
}
//REDUCER
export default function reducer(state = initialData, action){

    switch(action.type){
        //GETLIBROS
        case GET_LIBROS:
            return {
                ...state,
                fetching:true,
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
                deleting:true
            }
        case DELETE_LIBROS_ERROR:
            return {
                ...state,
                deleting: false,
                error: [...state.error, action.payload]
            }
        case DELETE_LIBROS_SUCCESS:
            return {
                ...state,
                deleting: false,
                reducerChanges: [...state.reducerChanges, action.payload]
            }

        //UPDATE LIBROS
        case UPDATE_LIBROS:
            return {
                ...state,
                updating:true,
            }
        case UPDATE_LIBROS_ERROR:
            return {
                ...state,
                updating: false,
                error: [...state.error, action.error]
            }
        case UPDATE_LIBROS_SUCCESS:
            return {
                ...state,
                updating: false,
                reducerChanges: [...state.reducerChanges, action.payload]
            }

        //POST LIBROS
        case POST_LIBROS:
            return {
                ...state,
                posting:true
            }
        case POST_LIBROS_ERROR:
            return {
                ...state,
                posting: false,
                error: [...state.error, action.error]
            }
        case POST_LIBROS_SUCCESS:
            return {
                ...state,
                posting: false,
                reducerChanges: [...state.reducerChanges, action.payload]
            }

        //DEFAULT
        default:
            return {
                ...state
            }
    }
}
//ACTIONS

export const getLibrosAction = () => { 
//GET LIBROS
    return async (dispatch, getState) => {

        const auth =  {'Authorization': getState().user.user}
        dispatch({
            type: GET_LIBROS
        })
        try{
            const res = await axios.get(URL + 'libro', { headers: auth })
            dispatch({
                type:GET_LIBROS_SUCCESS,
                payload: res.data.respuesta
            })        
        }catch(e){
            dispatch({
                type: GET_LIBROS_ERROR,
                payload: e.error
            })
        }
    }
}

export const deleteLibroAction = (props) => {

//DELETE LIBRO
    return async (dispatch, getState) => {
        const auth =  {'Authorization': getState().user.user};
        dispatch({
            type: DELETE_LIBROS
        })
        try{
            const res = await axios.delete(URL + 'libro/' + props, { headers: auth })

            if(res.status === 200 ){
                dispatch({
                    type: DELETE_LIBROS_SUCCESS,
                    payload: `${DELETE_LIBROS} : ${props}`
                })
            }
        }catch(e){
            dispatch({
                type: DELETE_LIBROS_ERROR,
                payload: 'Libro prestado'
            })
        }
    }
}

export const postLibroAction = (props) => {
//POST LIBRO
    return async (dispatch, getState) => {

        const auth =  {'Authorization': getState().user.user};

        dispatch({
            type: POST_LIBROS
        })

        try { 
            await axios({
                        method: 'post',
                        url: URL + 'libro',
                        data: props,
                        headers: auth
                        })
            .then(
                dispatch({
                    type: POST_LIBROS_SUCCESS,
                    payload: `${POST_LIBROS} : ${props}}`
                })
            )
        }catch(e){
            dispatch({
                type: DELETE_LIBROS_ERROR,
                error: e.error
            })
        }
    }
}

export const devolverLibroAction = (props) => {
//DEVOLVER LIBRO
    return async (dispatch, getState) => {

        const auth =  {'Authorization': getState().user.user};

        dispatch({
            type: UPDATE_LIBROS
        })

        try{
            await axios({
                        method: 'put',
                        url: URL + `libro/devolver/` + props,
                        headers:auth
                        })
                    .then(
                        dispatch({
                            type: UPDATE_LIBROS_SUCCESS,
                            payload: `${UPDATE_LIBROS} : libro devuelto`
                        })
                    )
        }catch(e){
            dispatch({
                type: UPDATE_LIBROS_ERROR,
                error: e.error
            })
        }
    }
}

export const prestarLibroAction = (id, persona) => {
//DEVOLVER LIBRO
    return async (dispatch, getState) => {

        const auth =  {'Authorization': getState().user.user};

        dispatch({
            type: UPDATE_LIBROS
        })

        try{
            const res = await axios.get(URL + `persona/` + persona, {headers: auth})
if(res.status === 200){
                await axios({
                    method: 'put',
                    url: URL + `libro/prestar/` + id,
                    headers: auth,
                    data: {
                        'id': id,
                        'persona_id': persona
                        }
                    })
                    .then(          
                        dispatch({
                            type: UPDATE_LIBROS_SUCCESS,
                            payload: `${UPDATE_LIBROS} : libro prestado`
                        })
                    )
            }
        }catch(e){
            dispatch({
                type: UPDATE_LIBROS_ERROR,
                error: e.error
            })
        }
    }
}*/

