import React from 'react';
import LibrosForm from './LibrosForm'
import LibrosList from './LibrosList'


export default function Biblioteca () {

	return(
		<div className='display'>
			<div className='contentForm'>
				<LibrosForm />
			</div>
				<LibrosList />
		</div>
	)
}


