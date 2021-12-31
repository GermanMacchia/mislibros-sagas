import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

export default function LoginForm () {

	const state = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [form, setForm] = useState({categoria:'',imagen:''});

	const handleForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
		
	}
	
    	const handleSubmit = () => {

	}

	return(
		<div id="catForm">
			{/*Formulario*/}
			<form action="Post Categoría">
               			 <span className="p-float-label">
					<InputText  name='categoria' className="p-inputtext-mb p-d-block txt" onChange={handleForm} />
					<label class="lab" htmlFor="categoria">Nueva Categoría</label>
               			 </span><br/>
				<span className="p-float-label">
					<InputText name='imagen' className="p-inputtext-mb p-d-block txt" onChange={handleForm} feedback={false} />
					<label class="lab" htmlFor="usuario">Dirección de Imagen</label>
				</span><br/>
				<span className="p-float-label">
					<InputTextarea name="descripcion" required rows={4} cols={18} class="txt" />
					<label class="lab" htmlFor="description">Descripción</label>
				</span><br/>
			</form>
			{/*Botones*/}
			{state.fetching? 
				<Button id="loading" loading loadingOptions={{ position: 'right' }} className="p-button-secondary p-ml-2" />
					: 
			 	<Button label="Crear" icon="pi pi-plus" className="p-button-success p-mr-2"  />
			}

		</div>
	);
}