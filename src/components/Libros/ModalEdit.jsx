import React, { useState, useEffect }from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button';
import { UPDATE_LIBROS, TOAST } from '../../sagas/types';


export default function ModalEdit({hideEditDialog, libroEditModal, libroUpdate}) {

	const categorias = useSelector(state => state.categoria.payload) 
	const personas = useSelector(state => state.persona.payload)
	const state = useSelector(state => state.libros)
	const dispatch = useDispatch()
	const [libro, setLibro] = useState({})
	const [form, setForm] = useState()
	//OPCIONES EN MODAL
	//const [stars, setStars] = useState()
	const [cat, setCat] = useState()
	const [per, setPer] = useState()
	//const [prestado, setPrestado] = useState()
	//const [categoriaModal, setCategoriaModal] = useState()
	const [enviado, setEnviado] = useState(false)

	//RESETAR FORMULARIO PRIME
	function resetForm () {
		//setPrestado(null)
		//setCategoriaModal(null)
		//setStars(null)
		setForm(null)		
		setEnviado(false)
		hideEditDialog();

	}

	//NECESITO GENERAR UNA OPCION PARA QUE SEA NULA SI FUERA EL CASO
	useEffect(() => {
		if(categorias != null && personas != null){

			const auxPer = [...personas, {id: null, alias: "NADIE"}]
			const auxCat = [...categorias]
			setCat(auxCat)
			setPer(auxPer)
		}

	}, [categorias, personas])

	useEffect(() => {
		setLibro(libroUpdate)
	}, [setLibro, libroUpdate]);

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.error]);

	const handleForm = (e) => {
        	//estas condiciones se hacen para que la opcion permanezca en el formulario del "Prime"
		/*
		if(e.target.name === "persona_id"){
		setPrestado(e.target.value)
		}
		if(e.target.name === "categoria_id"){
		setCategoriaModal(e.target.value)
		}
		if(e.target.name === "rating"){
		setStars(e.target.value)
		}		*/
		setLibro({
			...libro,
			[e.target.name]: e.target.value
			
		})
	}

	useEffect(() => {
		setForm({
			id: libro.id,
			nombre: libro.nombre,
			autor: libro.autor,
			categoria_id: libro.categoria_id,
			descripcion: libro.descripcion,
			persona_id: libro.persona_id,
			rating: libro.rating
		});
	}, [libro]);


	const saveProduct = () => {
		dispatch({
			type: UPDATE_LIBROS,
			props: form
		});
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
		<Dialog visible={libroEditModal} style={{ width: '450px' }} header="Edite el Libro" footer={productDialogFooter} modal className="p-fluid modalEdit" onHide={hideEditDialog}>
			<div className="p-field">
				<label htmlFor="nombre">Nombre</label>
				<InputText name="nombre" placeholder="Nombre" value={libro.nombre} onChange={ handleForm }  />
			</div>
			<div className="p-field">
				<label htmlFor="autor">Autor</label>
				<InputText name="autor" onChange={ handleForm } value={libro.autor} placeholder="Autor"/>
			</div>
			<div className="p-field">
				<label htmlFor="description">Descripción</label>
				<InputTextarea name="descripcion" onChange={ handleForm } value={libro.descripcion} placeholder="Descripción"  required rows={3} cols={20} />
			</div>
			<div className="p-field">
				<label className="p-mb-3">Categoria</label>
				<div className="p-formgrid p-grid">
				<Dropdown optionLabel="nombre" optionValue="id" placeholder="Categoría" value={libro.categoria_id} options={ cat } name="categoria_id" onChange={ handleForm } />
				</div>
			</div>
			<div className="p-field">
				<label className="p-mb-3">Prestado a</label>
				<div className="p-formgrid p-grid">
				<Dropdown optionLabel="alias" optionValue="id" placeholder="En biblioteca"  options={ per } name="persona_id" value={libro.persona_id} onChange={ handleForm } />
				</div> 
			</div>
			<div className="p-field">
				<label className="p-mb-3">Rating</label>
				<div style={{marginTop:"10px"}} className="p-formgrid p-grid">
				<Rating cancel={false} name="rating" value={libro.rating} onChange={ handleForm } />
				</div>
			</div>
		</Dialog>
	)
}