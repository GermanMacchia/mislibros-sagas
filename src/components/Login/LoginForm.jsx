import React, {useState, useEffect} from 'react';
import { connect, useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { LOGIN } from '../../sagas/types'; 
import { Button } from 'primereact/button';

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
		<div className="log">
			{/*Formulario*/}
			<form action="Login">
				<label>User </label>
					<input type="text" name='user' placeholder="Usuario" onChange={ handleForm } /><br/>
				<label>Pass </label>
					<input type="password" name='pass'placeholder="Contraseña" onChange={ handleForm }/><br/><br/>
			</form>
			{/*Botones*/}
			{state.fetching
				? <Button style={{ marginBottom: "10px", width: "23em", height: "auto"}} loading loadingOptions={{ position: 'right' }} className="p-button-secondary p-ml-2" />
				: <Button style={{ marginBottom: "10px", width: "23em", height: "auto"}} onClick={ handleSubmit } label="Login" icon="pi pi-sign-in" className="p-button-secondary p-ml-2" />
			}
			<br/>
			<Button style={{ width: "23em"}} className="google p-p-0">
				<i className="pi pi-google p-px-2" /> 
				<span style={{ marginLeft: "100px"}} className="p-px-3">Login with Google</span>
			</Button>
		</div>
	);
}

export default connect( null, null)( LoginForm );