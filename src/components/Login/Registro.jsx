import axios from 'axios';
import { REGISTER } from '../../sagas/types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password'
import { InputNumber } from 'primereact/inputnumber';

export default function Registro () {
	
	const dispatch = useDispatch();
	const alert = useAlert()
	const url = `https://mis-libros-bck.herokuapp.com/`;

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

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({
			type: REGISTER
		})
		async function registro () {
			await axios.post(url + `registro`, user)
			    .then((res) => {
                    alert.success('Se ha Registrado correctamente')
                })
                .catch((error) => {
                    console.error(error)
                    alert.error('Nombre de usuario ya registrado')
                });
        }
        registro();
		document.getElementById('myform').reset();
	}

	return(
		<>
			<div className="registro">
				<form className="log">
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
			{/* { ? : } */}
			<Button style={{ marginBottom: "10px", width: "20em", height: "auto"}} onClick={ handleSubmit } icon="pi pi-check" className="p-button-success" />
    	</>
		);
}