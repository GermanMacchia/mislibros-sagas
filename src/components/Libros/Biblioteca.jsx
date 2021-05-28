import React, { useEffect } from 'react';
import LibrosForm from './LibrosForm'
import LibrosList from './LibrosList'
import Spinner from '../utilities/Spinner'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useSelector } from 'react-redux';
import Lista from './Lista';


export default function Biblioteca () {

	const state = useSelector(state => state.libros)

	return(
		<div className= "center">
		{
			(state.loaded === false )
			?
				<>
					<br/>
					<Spinner />
				</>
			:
			<div>
				{/* <LibrosList />
				<Accordion style={{ width: "80em", marginTop: "10px"}} activeIndex={1}>
					<AccordionTab header={
							<>
								<i style={{ marginRight: "10px"}} className="pi pi-upload"/>
								Ingresar un libro
							</>
						}>
						<LibrosForm />
					</AccordionTab>
				</Accordion> */}
				<Lista />
			</div>
		}
		</div>
	)
}


