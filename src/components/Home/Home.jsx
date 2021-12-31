import React from 'react';
import Biblioteca from '../Libros/Biblioteca';
import Nav from './Nav';


export default function Home () {

		return (
				<>
					<Nav />
					<Biblioteca />
					<footer>
						<p class="copy">&copy; 2021 - Germán O. Macchia</p>
					</footer>
				</>
			)
}

