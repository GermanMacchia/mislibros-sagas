import axios from 'axios';
import React, {useState,  useRef } from 'react';
import { REGISTER, REGISTER_SUCCESS, REGISTER_ERROR } from '../../sagas/types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password'
import { URL } from '../../sagas/requests/URL';
import { Toast } from 'primereact/toast';

export default function Registro () {
	
	const dispatch = useDispatch();
	const state = useSelector(state => state.user)
	const toast = useRef(null);
	const [user, setUser] = useState({
		usuario: " ",
		clave: " ",
		email: " ",
		celu: " "
	})

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name] : e.target.value
		})
	}
	//SE ENVIA REGISTRO POR ACA PARA NO COMPROMETER CLAVE
	async function registrar () {
		await axios.post(URL + `registro`, user)
			.then((res) => {
				toast.current.show({ severity: 'success', summary: "Exito", detail: res.data.message});
				dispatch({ type: REGISTER_SUCCESS })
				document.getElementById('myform').reset();
			})
               	 	.catch((e) => {
				console.log(e.response.data.message)
				dispatch({ type: REGISTER_ERROR })	
				toast.current.show({ severity: 'error', summary: "Error de Registro", detail: "No enviaste los datos necesarios" });			
			});
        }

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({
			type: REGISTER
		})
        	registrar();
	}

	return(
		<>
			<div className="registro">
				<Toast ref={toast} />
				<form className="log" id="myform">
					<span className="p-float-label">
						<InputText name='usuario' className="p-inputtext-mb p-d-block" onChange={handleChange} />
						<label htmlFor="usuario">Usuario</label>											
                			</span>
					<span className="p-float-label">
						<Password name='clave' className="p-inputtext-mb p-d-block" onChange={handleChange} toggleMask />
						<label htmlFor="usuario">Contraseña</label>
					</span>
					<span className="p-float-label">
						<InputText name='email' className="p-inputtext-mb p-d-block" onChange={handleChange} />
						<label htmlFor="usuario">Email</label>
                			</span>
					<span className="p-float-label">
						<InputText name='celu' className="p-inputtext-mb p-d-block" onChange={handleChange} />
						<label htmlFor="telefono">Telefono</label>
                			</span>
				</form>
			</div>
			{state.registering? 
				<Button style={{ marginBottom: "10px", width: "20em", height: "auto"}} id="loading" loading className="p-button-secondary p-ml-2" />
					:
				<Button style={{ marginBottom: "10px", width: "20em", height: "auto"}} onClick={ handleSubmit } icon="pi pi-check" className="p-button-success" />
			}
    		</>
		);
}
