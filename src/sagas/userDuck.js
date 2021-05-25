import { LOGIN, LOG_OUT, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_GOOGLE_SUCCESS} from './types';
import { loginWithGoogle } from '../firebase';

const initialData = {
    loggedIn: false,
    fetching: false,
    user: [],
    id: {
        uid: []
    }
}

//REDUCER
export default function userReducer(state = initialData, action){
    switch(action.type){
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
                payload: action.payload
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