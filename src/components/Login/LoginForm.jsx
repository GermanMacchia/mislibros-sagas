import React, {useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { LOGIN } from '../../sagas/types'; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';

export default function LoginForm () {

	const history = useHistory();
	const state = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [form, setForm] = useState({user:'',pass:''});
    	const toast = useRef(null);

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

	useEffect(() => {
		
		if(state.error.length > 0){
			toast.current.show({ severity: 'error', summary: "Error de Login", detail: state.error.at(-1)});	
		}
		
	}, [state.error]);
	
    const handleSubmit = () => {
		dispatch({
			type: LOGIN,
			payload: form
		});
	}

	return(
		<div className="log">
			<Toast ref={toast} />
			{/*Formulario*/}
			<form action="Login">
                <span className="p-float-label">
                	<InputText  name='user' className="p-inputtext-mb p-d-block" onChange={handleForm} />
                	<label htmlFor="usuario">Usuario</label>
                </span><br/>
			<span className="p-float-label">
                	<Password name='pass' className="p-inputtext-mb p-d-block" onChange={handleForm} feedback={false} />
                	<label htmlFor="usuario">Contraseña</label>
                </span><br/>
			</form>
			{/*Botones*/}
			{state.fetching? 
				<Button id="loading" loading loadingOptions={{ position: 'right' }} className="p-button-secondary p-ml-2" />
					: 
				<Button onClick={ handleSubmit } label="Login" icon="pi pi-sign-in" className="p-button-secondary p-ml-2" />
			}
			<br/>
			<Button className="google p-p-0">
				<i className="pi pi-google p-px-2" /> 
				<span style={{ marginLeft: "100px"}} className="p-px-3">Login with Google</span>
			</Button>
		</div>
	);
}
