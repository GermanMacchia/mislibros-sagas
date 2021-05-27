import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../utils/Spinner'
import Nav from '../Home/Nav';
import CategoriaForm from './CategoriaForm'
import CategoriaList from './CategoriaList'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { GET_CATEGORIAS } from '../../sagas/types';

export default function Categorias () {

	const state = useSelector(state => state.libros)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch( { type: GET_CATEGORIAS } )
	}, [state.reducerChanges]);

	return(
		<>
			<Nav />
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
					<CategoriaList />
					<Accordion style={{ width: "80em", marginTop: "10px"}} activeIndex={1}>
						<AccordionTab header={
								<>
									<i style={{ marginRight: "10px"}} className="pi pi-upload"/>
									Ingresar un libro
								</>
							}>
						<CategoriaForm />
						</AccordionTab>
					</Accordion>
				</div>
			}
			</div>
		</>
		)
}



