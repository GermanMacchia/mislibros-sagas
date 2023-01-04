import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useDispatch } from 'react-redux'
import { Button } from 'primereact/button'
import { UPDATE_PERSONA } from '../../sagas/types'

export default function ModalEditLibros ( { hideEditDialog, personaEditModal, personaUpdate } ) {

	const dispatch = useDispatch()
	const [ form, setForm ] = useState()
	const [ persona, setPersona ] = useState( personaUpdate )

	// RESETAR FORMULARIO PRIME
	function resetForm () {
		setForm( null )
		hideEditDialog()
	}

	const handleForm = ( e ) => {
		setPersona( {
			...persona,
			[ e.target.name ]: e.target.value
		} )
	}

	useEffect( () => {
		setForm( {
			id: persona.id,
			nombre: persona.nombre,
			apellido: persona.apellido,
			email: persona.email,
			alias: persona.alias
		} )
	}, [ persona ] )

	const updatePersona = () => {
		dispatch( {
			type: UPDATE_PERSONA,
			props: form
		} )
		hideEditDialog()
	}

	const productDialogFooter = (
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ resetForm } />
			<Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ updatePersona } />
		</React.Fragment>
	)
	// OPTIONLABEL-> La llave que elije para desplegar del JSON
	// OPTIONVALUE -> El valor que devuelve
	return (
		<Dialog closable={ false } visible={ personaEditModal } style={ { width: '450px' } } header="Ingrese el libro" footer={ productDialogFooter } modal className="p-fluid" onHide={ hideEditDialog }>
			<div className="p-field">
				<label htmlFor="nombre">Nombre</label>
				<InputText name="nombre" placeholder="Nombre" value={ persona.nombre } onChange={ handleForm } />
			</div>
			<div className="p-field">
				<label htmlFor="apellido">Apellido</label>
				<InputText name="apellido" onChange={ handleForm } value={ persona.apellido } placeholder="Apellido" />
			</div>
			<div className="p-field">
				<label htmlFor="email">Email</label>
				<InputText name="email" onChange={ handleForm } value={ persona.email } placeholder="Email" />
			</div>
			<div className="p-field">
				<label className="p-mb-3">Alias</label>
				<div className="p-formgrid p-grid">
					<InputText name="alias" onChange={ handleForm } value={ persona.alias } placeholder="Alias" />
				</div>
			</div>
		</Dialog>
	)
}