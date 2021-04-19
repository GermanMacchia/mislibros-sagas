import React from 'react';
import axios from 'axios';
import Registro from '../Registro/Registro';
import LoginForm from './LoginForm'

export default function SignIn () {

	return(
		<>
			<div id="log">
				<LoginForm />
				<Registro />
			</div>
		</>
	);
}

