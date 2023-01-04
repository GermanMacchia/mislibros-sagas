import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { InputTextarea } from 'primereact/inputtextarea'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button'
import { UPDATE_LIBROS, TOAST } from '../../sagas/types'
import { VirtualScroller } from 'primereact/virtualscroller'

export default function CategoriaEdit ( { hideEditDialog } ) {

	const categorias = useSelector( state => state.categoria.payload )
	const state = useSelector( state => state.libros )
	const dispatch = useDispatch()
	//const [libros, setLibros] = useState({})
	const [ form, setForm ] = useState()
	//OPCIONES EN MODAL
	//const [per, setPer] = useState()
	const [ categoria, setCategoria ] = useState()
	const [ enviado, setEnviado ] = useState( false )

	const basicItems = categorias.from( { length: 100000 } ).map( ( _, i ) => `Item #${ i }` )

	//RESETAR FORMULARIO PRIME
	function resetForm () {

		setForm( null )
		setEnviado( false )
		hideEditDialog()

	}

	const basicItemTemplate = ( item, options ) => {
		const className = classNames( 'scroll-item p-p-2', {
			'odd': options.odd
		} )
		const style = options.props.orientation === 'horizontal' ? { width: '50px' } : { height: '50px' }

		return <div className={ className } style={ style }>{ item }</div>
	}


	useEffect( () => {
		if( state.error != null && enviado ) {
			dispatch( {
				type: TOAST,
				info: {
					severity: 'error',
					summary: 'Error',
					detail: state.error.at( -1 )
				}
			} )
		}
	}, [ state.error, enviado, dispatch ] )

	const handleForm = ( e ) => {

		setCategoria( {
			...categoria,
			[ e.target.name ]: e.target.value

		} )
	}



	const saveProduct = () => {
		dispatch( {
			type: UPDATE_LIBROS,
			props: form
		} )
		setEnviado( true )
	}

	const productDialogFooter = (
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={ () => { resetForm() } } />
			<Button label="Save" icon="pi pi-check" className="p-button-text" onClick={ () => { saveProduct() } } />
		</React.Fragment>
	)
	//OPTIONLABEL-> La llave que elije para desplegar del JSON
	//OPTIONVALUE -> El valor que devuelve
	return (
		<Dialog visible={ false } style={ { width: '450px' } } header="Edite el Libro" footer={ productDialogFooter } modal className="p-fluid" onHide={ hideEditDialog }>
			<div className="p-field">
				<label htmlFor="nombre">Nombre</label>
				<InputText name="nombre" placeholder="Nombre" onChange={ handleForm } />
			</div>
			<div className="p-field">
				<label htmlFor="autor">Imagen</label>
				<InputText name="autor" onChange={ handleForm } placeholder="Autor" />
			</div>
			<div className="p-field">
				<label htmlFor="description">Descripción</label>
				<InputTextarea name="descripcion" onChange={ handleForm } placeholder="Descripción" required rows={ 3 } cols={ 20 } />
			</div>
			<div className="p-field">
				<div className="p-d-flex p-dir-col p-mr-3 p-mt-3">
					<h6>Libros</h6>
					<VirtualScroller items={ basicItems } itemSize={ 50 } itemTemplate={ basicItemTemplate } />
				</div>
			</div>

		</Dialog>
	)
}