import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../utilities/Spinner'
import Nav from '../Home/Nav';
import CategoriaList from './CategoriaList';
import CategoriaForm from './CategoriaForm';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function Categorias () {

	const state = useSelector(state => state.libros)
	const titulo = (
			<>
				<i style={{ marginRight: "10px"}} className="pi pi-bookmark"/>
				Crear Categoria
			</>
	);
	const main = () =>{
		return	<>
				<Nav />
				<div>
					<div className="flex" >
						<Accordion style={{ width: "55vw"}} activeIndex={1}>
							<AccordionTab header={titulo}>
								<CategoriaForm />
							</AccordionTab>
						</Accordion>
						{
							(state.loaded === false) ?
							<div id="spin">
							<Spinner />
							</div>
								:
							<CategoriaList />
						}
					</div>
				</div>
			</>
	}

	return(
		main()
		)
}



