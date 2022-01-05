import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../utilities/Spinner'
import Nav from '../Home/Nav';
import CategoriaList from './CategoriaList';
import CategoriaForm from './CategoriaForm';
import { LOADED } from '../../sagas/types';

export default function Categorias () {

	const state = useSelector(state => state.libros)
	const categorias = useSelector(state => state.categoria)
	const dispatch = useDispatch()


	useEffect(() => {
		if(categorias.reload){
			dispatch( { type: LOADED })
		}
	}, [categorias.reload]);


	const main = () =>{
		return	<>
				<Nav />
				<div>
					<div class="flex" >
						<CategoriaForm />	
						{
							(state.loaded === false) ?
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

	return(
		main()
		)
}



