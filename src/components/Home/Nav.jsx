import React, { useEffect, useRef, useCallback } from 'react'
import { Menubar } from 'primereact/menubar'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { GET_CATEGORIAS, GET_PERSONA, GET_LIBROS, TOAST, LOGIN_SUCCESS } from '../../sagas/types'
import { Toast } from 'primereact/toast'

export default function Nav () {

	// TO DO REALIZAR SIGN OUT
	const dispatch = useDispatch()
	const history = useHistory()
	const state = useSelector( state => state.user )
	const toast = useRef( null )

	const init = useCallback(
		() => {
			dispatch( { type: GET_LIBROS } )
			dispatch( { type: GET_CATEGORIAS } )
			dispatch( { type: GET_PERSONA } )
		}, [ dispatch ]
	)

	useEffect( () => {
		init()
	}, [ init ] )

	useEffect( () => {
		let storage = localStorage.getItem( 'storage' )
		storage = JSON.parse( storage )

		if( storage && storage.user ) {
			dispatch( {
				type: LOGIN_SUCCESS,
				payload: storage.user
			} )
			init()
		}
	}, [ dispatch, init ] )

	useEffect( () => {
		if( state.info != null ) {
			toast.current.show( { severity: state.info.severity, summary: state.info.summary, detail: state.info.detail, life: 3000 } )
		}
		dispatch( {
			type: TOAST,
			info: null
		} )
	}, [ state.info, dispatch ] )

	const items = [
		{ label: 'Biblioteca', icon: 'pi pi-fw pi-book', command: () => { history.push( '/home' ) } },
		{ label: 'Categorias', icon: 'pi pi-fw pi-bookmark', command: () => { history.push( '/categoria' ) } },
		{ label: 'Personas', icon: 'pi pi-fw pi-users', command: () => { history.push( '/personas' ) } },
		{
			label: 'Sign Out', icon: 'pi pi-sign-out', command: () => {
				history.push( '/' )
				localStorage.clear()
			}
		}
	]

	return (
		<>
			<div>
				<Toast ref={ toast } />
				<div id="menu">
					<Menubar model={ items } />
				</div>
			</div>
		</>
	)

}