import { 
    LOGIN, 
    LOG_OUT, 
    LOGIN_SUCCESS, 
    LOGIN_ERROR, 
    LOGIN_GOOGLE_SUCCESS, 
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    TOAST
} from '../types'
import { loginWithGoogle } from '../../firebase'

const initialData = {
    loggedIn: false,
    fetching: false,
    user: [],
    id: {
        uid: []
    },
    error:[],
    info: null
}

//REDUCER
export default function reducer(state = initialData, action){
    switch(action.type){
        case REGISTER:
            return{
                ...state,
                registering: true,
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                registering: false,
            }
        case REGISTER_ERROR:
            return{
                ...state,
                registering: false,
            }
        case LOG_OUT:
            return{
                ...initialData
            }
        case LOGIN:
            return {
                ...state,
                fetching:true,
                user: action.payload
            }
        case LOGIN_ERROR:
            return {
                ...state,
                fetching: false,
                error: [...state.error, action.error]
            }
        case LOGIN_GOOGLE_SUCCESS:
            return {
                ...state,
                id: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                user: action.payload,
                loggedIn: true
            }
        case TOAST:
            return {
                ...state,
                info: action.info
            }
        default:
            return state
    }
}

// export const doLoginDbAction = (form) => {

//     return async dispatch => {
//     dispatch({
//         type: LOGIN
//     })

//     const loggin = await axios.post(url + `login`, form)
// 		if(loggin.data.token != null || undefined){
//             const token = loggin.data.token;
//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload: token
//             })
//         }else{
//             dispatch({
//                 type: LOGIN_ERROR,
//                 error: loggin.data.error
//             })
//         }
// 	}
// }

export const doLoginAction = () => dispatch => {
    return loginWithGoogle()
        .then( user => {
            dispatch({
                type: LOGIN_GOOGLE_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
            })
            
        })
        .catch( e => {
            console.log(e)
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
}