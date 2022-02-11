import React, { useState, useEffect }from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button';
import { POST_LIBROS, TOAST } from '../../sagas/types';

export default function ModalLibros({hideDialog, libroModal}) {

	const categorias = useSelector(state => state.categoria.payload) 
	const personas = useSelector(state => state.persona.payload)
	const state = useSelector(state => state.libros)
	const dispatch = useDispatch()
	const [form, setForm] = useState()
	//OPCIONES EN MODAL
	const [stars, setStars] = useState()
	const [cat, setCat] = useState()
	const [per, setPer] = useState()
	const [prestado, setPrestado] = useState()
	const [categoriaModal, setCategoriaModal] = useState()
	const [enviado, setEnviado] = useState(false)

	//RESETAR FORMULARIO PRIME
	function resetForm () {
		setPrestado(null)
		setCategoriaModal(null)
		setStars(null)
		setForm(null)		
		setEnviado(false)
		hideDialog();
	}

	//NECESITO GENERAR UNA OPCION PARA QUE SEA NULA SI FUERA EL CASO
	useEffect(() => {
		if(categorias != null && personas != null){

			const auxPer = [...personas, {id: null, alias: "NADIE"}]
			const auxCat = [...categorias, {id: null, nombre:"NINGUNA"}]
			setCat(auxCat)
			setPer(auxPer)
		}
	}, [categorias, personas])

	useEffect(() => {
		if(state.error != null && enviado){
		dispatch({
			type:TOAST, 
			info: { 
			severity: 'error', 
			summary: 'Error', 
			detail: state.error.at(-1)
			}
		}) 
		}		
	}, [state.error, dispatch, enviado]);

	const handleForm = (e) => {
        	//estas condiciones se hacen para que la opcion permanezca en el formulario del "Prime"
		if(e.target.name === "persona_id"){
		setPrestado(e.target.value)
		}
		if(e.target.name === "categoria_id"){
		setCategoriaModal(e.target.value)
		}
		if(e.target.name === "rating"){
		setStars(e.target.value)
		}
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	}

	const saveProduct = () => {
		dispatch({
			type: POST_LIBROS,
			props: form
		});
		dispatch({
			type:TOAST, 
			info: { 
			severity: 'success', 
			summary: 'Libro Nuevo', 
			detail: form.nombre
			}
		}) 
		hideDialog();
		setEnviado( true )
	}

	const productDialogFooter = (
	<React.Fragment>
		<Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={resetForm } />
		<Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
	</React.Fragment>
	);
	//OPTIONLABEL-> La llave que elije para desplegar del JSON
	//OPTIONVALUE -> El valor que devuelve
	return(
		<Dialog closable={false} visible={libroModal} style={{ width: '450px' }} header="Ingrese el libro" footer={productDialogFooter} modal className="p-fluid" onHide={hideDialog}>
			<div className="p-field">
				<label htmlFor="nombre">Nombre</label>
				<InputText name="nombre" placeholder="Nombre" onChange={ handleForm }  />
			</div>
			<div className="p-field">
				<label htmlFor="autor">Autor</label>
				<InputText name="autor" onChange={ handleForm } placeholder="Autor"/>
			</div>
			<div className="p-field">
				<label htmlFor="description">Descripción</label>
				<InputTextarea name="descripcion" onChange={ handleForm } placeholder="Descripción"  required rows={3} cols={20} />
			</div>
			<div className="p-field">
				<label className="p-mb-3">Categoria</label>
				<div className="p-formgrid p-grid">
				<Dropdown optionLabel="nombre" optionValue="id" placeholder="Categoría" options={ cat } name="categoria_id" value={ categoriaModal }  onChange={ handleForm } />
				</div>
			</div>
			<div className="p-field">
				<label className="p-mb-3">Prestado a</label>
				<div className="p-formgrid p-grid">
				<Dropdown optionLabel="alias" optionValue="id" placeholder="En biblioteca" options={ per } name="persona_id" value={ prestado } onChange={ handleForm } />
				</div> 
			</div>
			<div className="p-field">
				<label className="p-mb-3">Rating</label>
				<div style={{marginTop:"10px"}} className="p-formgrid p-grid">
				<Rating cancel={false} value={ stars } name="rating" onChange={ handleForm } />
				</div>
			</div>
		</Dialog>
	)
}