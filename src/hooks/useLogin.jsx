import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { LOGIN, REGISTER } from "../sagas/types"

export const useLogin = () => {

    const state = useSelector( state => state.user )
    const dispatch = useDispatch()
    const [ form, setForm ] = useState( { user: '', pass: '' } )
    const [ newUser, setNewUser ] = useState( {
        usuario: " ",
        clave: " ",
        email: " ",
        celu: " "
    } )

    const handleSignIn = ( e ) => {
        setForm( {
            ...form,
            [ e.target.name ]: e.target.value
        } )

    }

    const submitLogin = () => {
        dispatch( {
            type: LOGIN,
            payload: form
        } )
    }


    const handleSignUp = ( e ) => {
        setNewUser( {
            ...newUser,
            [ e.target.name ]: e.target.value
        } )
    }

    const submitSignUp = ( e ) => {
        dispatch( {
            type: REGISTER,
            payload: newUser
        } )
    }

    return {
        handleSignIn,
        handleSignUp,
        submitLogin,
        submitSignUp,
        isFetching: state.fetching,
        isPosting: state.registering
    }
}
