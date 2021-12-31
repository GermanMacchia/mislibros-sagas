import React from 'react';
import Registro from './Registro';
import LoginForm from './LoginForm';
import { Card } from 'primereact/card';
import shelve from '../../assets/shelve.jpg';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function SignIn () {

	const header = (
        <h1>Mis Libros App</h1>
    );

	return(
		
		<>
			<div className="center" >
				<Card title="Ingresa a tu biblioteca" header={header}>
					<img id="intro" src= {shelve} alt="shelve" />
					<LoginForm />
					<Accordion style={{ width: "23em", marginTop: "10px"}} activeIndex={1}>
						<AccordionTab header={
								<>
									<i style={{ marginRight: "10px"}} className="pi pi-user"/>
									Registrate
								</>
							}>
							<Registro />
						</AccordionTab>
					</Accordion>
				</Card>
        	</div>
		</>
	);
}

