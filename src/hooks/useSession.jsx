
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GET_CATEGORIAS, GET_PERSONA, GET_LIBROS, LOGIN_SUCCESS } from '../sagas/types'

export const useSession = () => {

    const dispatch = useDispatch()
    const info = useSelector( state => state.user.info )
    const history = useHistory()
    const storage = JSON.parse( localStorage.getItem( 'storage' ) )


    const init = () => {

        if( storage?.user ) {
            dispatch( {
                type: LOGIN_SUCCESS,
                payload: storage.user
            } )
            dispatch( { type: GET_LIBROS } )
            dispatch( { type: GET_CATEGORIAS } )
            dispatch( { type: GET_PERSONA } )
        }
    }

    const signOut = () => {
        history.push( '/' )
        localStorage.clear()
    }


    const toPersonas = () => { history.push( '/personas' ) }

    const toHome = () => { history.push( '/home' ) }

    const toCategoria = () => { history.push( '/categoria' ) }


    return {
        init,
        info,
        signOut,
        toPersonas,
        toHome,
        toCategoria
    }
}
