import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { POST_CATEGORIAS } from '../../sagas/types';

export default function CategoriaForm () {

	const state = useSelector(state => state.user)
	const categorias = useSelector(state => state.categoria)
	const dispatch = useDispatch()
	const [form, setForm] = useState({nombre:'',imagen:'', descripcion: ''});

	const handleForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	}
	
    	const handleSubmit = () => {
		dispatch({
			type: POST_CATEGORIAS,
			props: form
		});
	}

	useEffect(() => {
		
		if(categorias.reload){
			document.getElementById('categoriaForm').reset();
		}
	}, [categorias.reload]);

	return(
		<div id="catForm">
			{/*Formulario*/}
			<form id="categoriaForm" action="Post Categoría">
               			 <span className="p-float-label">
					<InputText  name='nombre' className="p-inputtext-mb p-d-block txt" onChange={handleForm} />
					<label class="lab" htmlFor="categoria">Nueva Categoría</label>
               			 </span><br/>
				<span className="p-float-label">
					<InputText name='imagen' className="p-inputtext-mb p-d-block txt" onChange={handleForm} />
					<label class="lab" htmlFor="imagen">Dirección de Imagen</label>
				</span><br/>
				<span className="p-float-label">
					<InputTextarea name="descripcion" required rows={4} cols={18} className='p-inputtext-mb p-d-block txt' onChange={handleForm}/>
					<label class="lab" htmlFor="description">Descripción</label>
				</span>
			</form>
			{/*Botones*/}
			{state.fetching? 
				<Button id="loading" loading loadingOptions={{ position: 'right' }} className="p-button-secondary p-ml-2" />
					: 
				<Button label="Crear" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={handleSubmit} />
			}
		</div>
	);
}