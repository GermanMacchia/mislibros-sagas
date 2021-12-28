import React from 'react'
import Spinner from '../utilities/Spinner'
import { useSelector } from 'react-redux'
import Lista from './Lista';


export default function Biblioteca () {

	const state = useSelector(state => state.libros)

	return(
		<div className= "center">
		{
			(state.loaded === false )
			?
				<>
					<br/>
					<Spinner />
				</>
			:
			<div>
				<Lista />
			</div>
		}
		</div>
	)
}


