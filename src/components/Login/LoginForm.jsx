import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert';
import axios from 'axios';
import Home from '../Home/Home';
import { Fab } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

function LoginForm (props) {

	const history = useHistory();
	const alert = useAlert()
	const url = `//localhost:8000/`;

	const [form, setForm] = useState({
								user:'',
								pass:''
							});

	const handleForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	}

    const handleSubmit = (e) => {
    	e.preventDefault();

    	async function postLogin () { 
			await axios.post(url + `login`, form)
				.then( (res) => {
					if(res.data.token != null || undefined){
						const token = res.data.token;
						props.onSave({
							token: token,
							auth: true
						});
						alert.success(`¡Bienvenido ${form.user}!`);
						history.push('/home');
					}
				})
				.catch( (error) => {
				    alert.error('Error de Datos');
				});
		}

		postLogin();
	}

	return(
		<div className= "Logform">
			<h2>Ingresa a tu biblioteca</h2>
			<form action="Login">
				<label>User </label>
				<input type="text" name='user' placeholder="Usuario" onChange={handleForm} /><br/>
				<label>Pass </label>
				<input type="password" name='pass'placeholder="Contraseña" onChange={handleForm}/><br/><br/>
				<Fab color="primary">
					<PowerSettingsNewIcon fontSize="large" type= "submit" onClick={handleSubmit} />
				</Fab>	
			</form>
		</div>
	);

}

const mapActionsToProps = (dispatch) => {
	return {onSave: (token) => dispatch({type:'TOKEN', data: token})}
}

export default connect(null, mapActionsToProps)(LoginForm);



