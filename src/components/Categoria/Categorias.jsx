import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner'
import Nav from '../Home/Nav'
import CategoriaList from './CategoriaList'
import CategoriaForm from './CategoriaForm'


export default function Categorias () {

	const state = useSelector( state => state.libros )

	const main = () => {
		return <>
			<Nav />
			<div>
				<div className="flex" >
					<CategoriaForm />
					{
						( state.loaded === false ) ?
							<div id="spin">
								<Spinner />
							</div>
							:
							<CategoriaList />
					}
				</div>
			</div>
		</>
	}

	return (
		main()
	)
}



