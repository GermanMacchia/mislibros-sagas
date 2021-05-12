import axios from 'axios';

const url = `https://mis-libros-bck.herokuapp.com/`;

const GET_LIBROS = "GET_LIBROS"
const GET_LIBROS_ERROR = "GET_LIBROS_ERROR";
const GET_LIBROS_SUCCESS = "GET_LIBROS_SUCCESS";


const initialData = {
    fetching: false,
    loaded: false,
    posting: false,
    updating: false,
    deleting: false
}

export default function reducer(state = initialData, action){
    switch(action.type){
        case GET_LIBROS:
            return {
                ...state,
                fetching:true
            }
        default:
            return {
                ...state
            }
    }
}