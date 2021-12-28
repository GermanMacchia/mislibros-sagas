/*import axios from 'axios'
import { prestarLibroAction } from './librosDuck'
import { GET_PERSONA, GET_PERSONA_ERROR, GET_PERSONA_SUCCESS } from '../sagas/types'
import { URL } from '../sagas/requests/URL'

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
//ACTIONS
export const getPersonaAction = () => {
    //GET CATEGORIA
    return async (dispatch, getState) => {
        const auth =  {'Authorization': getState().user.user}
        dispatch({
            type: GET_PERSONA
        })
        const res = await axios.get(URL + `persona`, {headers: auth})
        if(res.status === 200){
        dispatch({
            type: GET_PERSONA_SUCCESS,
            payload: res.data.respuesta
        })
        }else{
        dispatch({
            type: GET_PERSONA_ERROR,
            error: res.error
        })
        }
    }
}

export const getPrestarAction = (id, persona) => {
    //VERIFICAR CATEGORIA
    return async (dispatch, getState) => {
        const auth =  {'Authorization': getState().user.user}
        dispatch({
            type: GET_PERSONA
        })
        try{
            const res = await axios.get(URL + `persona/` + persona, {headers: auth})
            if(res.status === 200){
                prestarLibroAction(id, persona)
            }
        }catch(e){
            dispatch({
                type: GET_PERSONA_ERROR,
                error: e.error
            })
        }
    }
}




	// 	async function verificarPersona () {
	// 		await axios.get(url + `persona/` + persona, {headers: header}
	// 			)
	// 		.then( (res) => {
	// 			console.log('Persona existente')
	// 			prestarLibro ();
	// 			})
	// 			.catch( (error) => {
	// 			    alert.error('Ese ID de persona no existe');
	// 			});
	// 		}
*/