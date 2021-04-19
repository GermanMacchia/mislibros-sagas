import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Nav from '../Home/Nav';

import PersonaForm from './PersonaForm'
import PersonaList from './PersonaList'



function Personas (props) {


	return(
		<>
			<Nav />
			<div className='display'>
				<div className='contentForm'>
					<PersonaForm />
				</div>
					<PersonaList />
			</div>
		</>
		)
}

const mapStateToProps = (state) =>{
	return {token: state}
}

export default connect(mapStateToProps, null)(Personas);

