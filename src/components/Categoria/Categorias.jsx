import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../utilities/Spinner'
import Nav from '../Home/Nav';
import CategoriaList from './CategoriaList';
import CategoriaForm from './CategoriaForm';
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
			<div>
			{
				(state.loaded === false)
				?
					<>
						<br/>
						<Spinner />
					</>
				:
				<div class="flex" >
					<CategoriaForm />
					<CategoriaList />
					{/*<Accordion style={{ width: "80em", marginTop: "10px"}} activeIndex={1}>
						<AccordionTab header={
								<>
									<i style={{ marginRight: "10px"}} className="pi pi-upload"/>
									Ingresar un libro
								</>
							}>

						</AccordionTab>
						</Accordion>*/}
				</div>
			}
			</div>
		</>
		)
}



