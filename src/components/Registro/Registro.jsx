import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { Fab } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function Registro () {
	
	const alert = useAlert()
	const url = `//localhost:8000/`;

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
        document.getElementById("registro").reset()
	}


	return(
			<div className= "Logform">
				<h2>Registrate</h2>
				<form id="registro">
					<label>User </label>
					<input type="text" name="usuario"  onChange= {handleChange} placeholder="Nombre de usuario" /><br/>
					<label>Pass </label>
					<input type="password" name="clave" onChange= {handleChange} placeholder="Ingrese una contraseña" /><br/>
					<label>Mail </label>
					<input type="email" name="email" onChange= {handleChange} placeholder="Ingrese un email" /><br/>
					<label>Celu </label>
					<input type="text" name="celu" onChange= {handleChange} placeholder="Nro. de contacto"/><br/><br/>
					<Fab color="primary">
						<AssignmentIcon fontSize="large" type= "submit" onClick={handleSubmit} />
					</Fab>
				</form>
			</div>
		);
}