import React, {useState, useEffect} from 'react';
import { connect, useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { Fab } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import googleI from '../../assets/googleIcon.svg';
import { LOGIN } from '../../sagas/types'; 

function LoginForm () {

	const history = useHistory();
	const state = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [form, setForm] = useState({user:'',pass:''});

	const handleForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
		
	}
	
	useEffect(() => {
		if(state.loggedIn === true){
			history.push('/home');
		}
	}, [state.loggedIn])
	
    const handleSubmit = () => {
		dispatch({
			type: LOGIN,
			payload: form
		});
	}

	return(
		<div className= "Logform">
			<h2>Ingresa a tu biblioteca</h2>
			{/*Formulario*/}
			<form action="Login">
				<label>User </label>
					<input type="text" name='user' placeholder="Usuario" onChange={ handleForm } /><br/>
				<label>Pass </label>
					<input type="password" name='pass'placeholder="Contraseña" onChange={ handleForm }/><br/><br/>
			</form>
			{/*Botones*/}
			<div id="logButt">
				<Fab color="primary">
					<PowerSettingsNewIcon fontSize="large" onClick={ handleSubmit } />
				</Fab>
				<button id="googleIcon"  >
					<img id= "imgGoog" src={ googleI } />
				</button>	
			</div>
		</div>
	);
}

export default connect( null, null)( LoginForm );