import React, { useEffect, useRef } from 'react';
import Registro from './Registro';
import LoginForm from './LoginForm';
import { Card } from 'primereact/card';
import shelve from '../../assets/shelve.jpg';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { TOAST } from '../../sagas/types'
import { useHistory } from "react-router-dom";


export default function SignIn () {
	
	const toast = useRef(null);
	const dispatch = useDispatch()
	const state = useSelector(state => state.user)
	const history = useHistory();
	const titulo = (
			<>
				<i style={{ marginRight: "10px"}} className="pi pi-user"/>
				Registrate
			</>
	);
	const header = (
        	<h1>Mis Libros App</h1>
   	 );

	useEffect(() => {
		
		if(state.redirect.redirecting === true){
			history.push(state.redirect.page);
		}
	}, [state.redirect, history]);
	
    	useEffect(() => {
		if(state.info != null){
			toast.current.show({ severity: state.info.severity, summary: state.info.summary, detail: state.info.detail, life: 3000	 });
		}
		dispatch({
			type:TOAST, 
			info: null
		}) 
	}, [state.info, dispatch]);


		

	return(
		
		<>
			<Toast ref={toast} />	
			<div className="center" >
				<Card title="Ingresa a tu biblioteca" header={header}>
					<img id="intro" src= {shelve} alt="shelve" />
					<LoginForm />
					<Accordion style={{ width: "23em", marginTop: "10px"}} activeIndex={1}>
						<AccordionTab header={titulo}>
							<Registro />
						</AccordionTab>
					</Accordion>
				</Card>
        	</div>
		</>
	);
}

