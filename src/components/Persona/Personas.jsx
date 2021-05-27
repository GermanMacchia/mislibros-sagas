import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from '../Home/Nav'
import Spinner from '../utils/Spinner'
import PersonaForm from './PersonaForm'
import PersonaList from './PersonaList'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { GET_PERSONA } from '../../sagas/types'

export default function Personas () {

	const state = useSelector(state => state.persona)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch( { type: GET_PERSONA } )
	}, [state.reducerChanges]);

	return(
		<>
			<Nav />
			<div className='center'>
				{
					(state.loaded === false)
					?
						<>
							<br/>
							<Spinner />
						</>
					:
					<div>
					<PersonaList />
					<Accordion style={{ width: "80em", marginTop: "10px"}} activeIndex={1}>
						<AccordionTab header={
								<>
									<i style={{ marginRight: "10px"}} className="pi pi-upload"/>
									Ingresar una persona
								</>
							}>
							<PersonaForm />
						</AccordionTab>
					</Accordion>
					</div>
				}
			</div>
		</>
	)
}

