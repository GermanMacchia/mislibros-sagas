/*

import axios from 'axios';

import { URL } from '../sagas/requests/URL'
import {
    GET_CATEGORIAS,
    GET_CATEGORIAS_ERROR,
    GET_CATEGORIAS_SUCCESS } from '../sagas/types'

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
                fetching:true,
                loaded: false
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
        try{
            const res = await axios.get(URL + `categoria`, {headers: auth})
            dispatch({
                type: GET_CATEGORIAS_SUCCESS,
                payload: res.data.respuesta
            })
        }catch(e){
            dispatch({
                type: GET_CATEGORIAS_ERROR,
                error: e.error
            })
        }
    }
} */