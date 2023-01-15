import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { useLogin } from '../../hooks/useLogin'

export default function Registro () {

	const { handleSignUp, submitSignUp, isPosting } = useLogin()

	return (
		<>
			<div className="registro">
				<form className="log" id="myform">
					<span className="p-float-label">
						<InputText name='usuario' className="p-inputtext-mb p-d-block" onChange={ handleSignUp } />
						<label htmlFor="usuario">Usuario</label>
					</span>
					<span className="p-float-label">
						<Password name='clave' className="p-inputtext-mb p-d-block" onChange={ handleSignUp } toggleMask />
						<label htmlFor="usuario">Contraseña</label>
					</span>
					<span className="p-float-label">
						<InputText name='email' className="p-inputtext-mb p-d-block" onChange={ handleSignUp } />
						<label htmlFor="usuario">Email</label>
					</span>
					<span className="p-float-label">
						<InputText name='celu' className="p-inputtext-mb p-d-block" onChange={ handleSignUp } />
						<label htmlFor="telefono">Telefono</label>
					</span>
				</form>
			</div>
			{ isPosting ?
				<Button style={ { marginBottom: "10px", width: "20em", height: "auto" } } id="loading" loading className="p-button-secondary p-ml-2" />
				:
				<Button style={ { marginBottom: "10px", width: "20em", height: "auto" } } onClick={ submitSignUp } icon="pi pi-check" className="p-button-success" />
			}
		</>
	)
}
