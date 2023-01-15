import Spinner from '../Spinner'
import Lista from './Lista/Lista'
import { useLibros } from '../../hooks/useLibros'

export default function Biblioteca () {

	const queries = useLibros()

	return (
		<>
			<div id="imagen"></div>
			<div className="center">
				{
					queries.isFetching
						? <Spinner />
						: <Lista queries={ queries } />
				}
			</div>
		</>
	)
}


