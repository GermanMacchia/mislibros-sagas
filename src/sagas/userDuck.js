const initialData = {
    loggedIn: false,
    fetching: false,
    user: [],
    id: {
        uid: []
    }
}

//GETERS
export const LOGIN = "LOGIN";
export const LOGIN_GOOGLE = "LOGIN_GOOGLE"

//SETERS
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; 
const LOGIN_GOOGLE_SUCCESS = 'LOGIN_GOOGLE_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export const setLoginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

//ERRORS
export const LOGIN_ERROR = 'LOGIN_ERROR';

//REDUCER
export default (state = initialData, action) => {
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

