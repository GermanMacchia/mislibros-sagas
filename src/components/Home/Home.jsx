import React from 'react';
import { connect } from 'react-redux';

import Biblioteca from '../Libros/Biblioteca';
import Nav from './Nav';


export default function Home () {

		return (
				<>
					<Nav />
					<Biblioteca />
				</>
			)
}

