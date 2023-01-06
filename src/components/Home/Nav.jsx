import React, { useEffect } from 'react'
import { Menubar } from 'primereact/menubar'
import { useSession } from '../../hooks'


export default function Nav () {

	const { init, signOut, toPersonas, toHome, toCategoria } = useSession()

	useEffect( () => {
		init()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] )

	const items = [
		{ label: 'Biblioteca', icon: 'pi pi-fw pi-book', command: () => toHome() },
		{ label: 'Categorias', icon: 'pi pi-fw pi-bookmark', command: () => toCategoria() },
		{ label: 'Personas', icon: 'pi pi-fw pi-users', command: () => toPersonas() },
		{ label: 'Sign Out', icon: 'pi pi-sign-out', command: () => signOut() }
	]

	return (
		<>
			<div>
				<div id="menu">
					<Menubar model={ items } />
				</div>
			</div>
		</>
	)
}