import Spinner from '../utilities/Spinner'
import { useSelector } from 'react-redux'
import Lista from './Lista/Lista'

export default function Biblioteca () {

	const state = useSelector( state => state.libros )

	return (
		<>
			<div id="imagen"></div>
			<div className="center">
				{
					( state.loaded === false )
						?
						<>
							<br />
							<Spinner />
						</>
						:
						<div>
							<Lista />
						</div>
				}
			</div>
		</>
	)
}


