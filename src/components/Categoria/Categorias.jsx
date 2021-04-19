import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Nav from '../Home/Nav';
import CategoriaForm from './CategoriaForm'
import CategoriaList from './CategoriaList'


function Categorias (props) {

	const [libros, setLibros] = useState({});


	return(
		<>
			<Nav />
			<div className='display'>
				<div className='contentForm'>
					<CategoriaForm />
				</div>
					<CategoriaList />
			</div>
		</>
		)
}

const mapStateToProps = (state) =>{
	return {token: state}
}

export default connect(mapStateToProps, null)(Categorias);

