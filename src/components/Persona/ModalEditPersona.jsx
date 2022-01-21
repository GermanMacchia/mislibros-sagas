import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useDispatch } from 'react-redux'
import { Button } from 'primereact/button';
import { POST_PERSONA  } from '../../sagas/types';

export default function ModalEditLibros({hideDialog, personaEditModal, personaUpdate}) {

	const dispatch = useDispatch()
	const [form, setForm] = useState()

	//RESETAR FORMULARIO PRIME
	function resetForm () {
		setForm(null)		
		hideDialog();
	}

	const handleForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	}

	const savePersona = () => {
		dispatch({
			type: POST_PERSONA,
			props: form
		});
		hideDialog();
	}

	const productDialogFooter = (
	<React.Fragment>
		<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={resetForm } />
		<Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savePersona} />
	</React.Fragment>
	);
	//OPTIONLABEL-> La llave que elije para desplegar del JSON
	//OPTIONVALUE -> El valor que devuelve
	return(
		<Dialog visible={personaEditModal} style={{ width: '450px' }} header="Ingrese el libro" footer={productDialogFooter} modal className="p-fluid" onHide={hideDialog}>
			<div className="p-field">
				<label htmlFor="nombre">Nombre</label>
				<InputText name="nombre" placeholder="Nombre" onChange={ handleForm }  />
			</div>
			<div className="p-field">
				<label htmlFor="apellido">Apellido</label>
				<InputText name="apellido" onChange={ handleForm } placeholder="Apellido"/>
			</div>
			<div className="p-field">
				<label htmlFor="email">Email</label>
				<InputText name="email" onChange={ handleForm } placeholder="Email" />
			</div>
			<div className="p-field">
				<label className="p-mb-3">Alias</label>
				<div className="p-formgrid p-grid">
				<InputText name="alias" onChange={ handleForm } placeholder="Alias" />
				</div>
			</div>
		</Dialog>
	)
}