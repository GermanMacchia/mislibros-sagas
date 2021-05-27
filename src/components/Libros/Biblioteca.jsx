import React, { useEffect } from 'react';
import LibrosForm from './LibrosForm'
import LibrosList from './LibrosList'
import Spinner from '../utils/Spinner'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useSelector, useDispatch } from 'react-redux';
import { GET_LIBROS } from '../../sagas/types';
// import Lista from './Lista';


export default function Biblioteca () {

	const state = useSelector(state => state.libros)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch( { type: GET_LIBROS } )
	}, [state.reducerChanges]);

	return(
		<div className= "center">
		{
			(state.loaded === false)
			?
				<>
					<br/>
					<Spinner />
				</>
			:
			<div>
				<LibrosList />
				<Accordion style={{ width: "80em", marginTop: "10px"}} activeIndex={1}>
					<AccordionTab header={
							<>
								<i style={{ marginRight: "10px"}} className="pi pi-upload"/>
								Ingresar un libro
							</>
						}>
						<LibrosForm />
					</AccordionTab>
				</Accordion>
				{/* <Lista /> */}
			</div>
		}
		</div>
	)
}


