import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import LibrosForm from './LibrosForm'
import LibrosList from './LibrosList'


function Biblioteca (props) {

	return(
		<div className='display'>
			<div className='contentForm'>

				<LibrosForm />
			</div>
				<LibrosList />
		</div>
	)
}

const mapStateToProps = (state) =>{
	return {libros: state}
}

export default connect(mapStateToProps, null)(Biblioteca);


