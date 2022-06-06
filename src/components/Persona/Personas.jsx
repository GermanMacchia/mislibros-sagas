import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from '../Home/Nav'
import Spinner from '../utilities/Spinner'
import PersonaList from './PersonasList'
import { GET_PERSONA } from '../../sagas/types'

export default function Personas () {

	const state = useSelector(state => state.persona)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch( { type: GET_PERSONA } )
	}, [state.reducerChanges, dispatch]);

	return(
		<>			
			<Nav />
			<div id="imagen"></div>
			<div className='center'>
				{
					(state.loaded === false)
					?
					<Spinner />
					:
					<PersonaList />
				}
			</div>
		</>
	)
}

