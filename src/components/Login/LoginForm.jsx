import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { useLogin } from '../../hooks/useLogin'

export default function LoginForm () {

	const { handleSignIn, submitLogin, isFetching } = useLogin()

	return (
		<div className="log">
			{/* Formulario */ }
			<form action="Login">
				<span className="p-float-label">
					<InputText name='user' className="p-inputtext-mb p-d-block" onChange={ handleSignIn } />
					<label htmlFor="usuario">Usuario</label>
				</span><br />
				<span className="p-float-label">
					<Password name='pass' className="p-inputtext-mb p-d-block" onChange={ handleSignIn } feedback={ false } />
					<label htmlFor="usuario">Contraseña</label>
				</span><br />
			</form>
			{/* Botones */ }
			{ isFetching ?
				<Button id="loading" loading className="p-button-secondary p-ml-2" />
				:
				<Button onClick={ submitLogin } label="Login" icon="pi pi-sign-in" className="p-button-secondary p-ml-2" />
			}
			<br />
			<Button disabled className="google p-p-0">
				<i className="pi pi-google p-px-2" />
				<span style={ { marginLeft: "100px" } } className="p-px-3">Login with Google</span>
			</Button>
		</div>
	)
}
