import React, {useEffect, useState} from 'react';
import { connect, useSelector} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import ClassIcon from '@material-ui/icons/Class';
import FormatList from '@material-ui/icons/FormatListNumbered';
import  {  deleteLibroAction, devolverLibroAction, prestarLibroAction } from '../../reducers/librosDuck';

function LibrosList ({ deleteLibroAction, devolverLibroAction }) {

	const state = useSelector(state => state.libros)
	const [librosHtml, setLibrosHtml] = useState();
	const [libros, setLibros] = useState();

	const handleDelete = (e) =>{
		const opcion = window.confirm('¿Seguro que quieres eliminar?');
			if(opcion === true){
					
					deleteLibroAction(e)
			}
	}

	useEffect(() => {
		setLibros(state.payload)
	}, [state.loaded]);

	useEffect(() => {
		if(libros !== undefined) {
			const librosAux = libros.map((libro, index) => (
				<tr key={index}>
					<td id="indexlibro"><p><strong>{index + 1}</strong></p></td>
					<td id="nombrelibro"><p>{libro.nombre}</p></td>
					<td id="categorialibro"><p>{libro.categoria_id}</p></td>
					<td id="descripcionlibro"><p>{libro.descripcion}</p></td>
					<td id="personalibro"><p>{libro.persona_id}</p></td>
					<td id="prestarbtt">
						<IconButton color="primary">
							<Tooltip title="Prestar">
								<MenuBookIcon className="icon" onClick={() => {}} value={libro.id} />
							</Tooltip>
						</IconButton>
					</td>
					<td id="devolverbtt">
						<IconButton color="primary">
							<Tooltip title= "Devolver">
								<VerticalAlignBottomIcon className="icon" onClick={() => {}} />
							</Tooltip>
						</IconButton>
					</td>
					<td id="borrarbtt">
						<IconButton color="primary">
							<Tooltip title= "Borrar">
								<DeleteIcon className="icon" onClick={() => {handleDelete(libro.id)}} />
							</Tooltip>
						</IconButton>
					</td>
					<td id="editarbtt">
						<IconButton color="primary">
							<Tooltip title= "Editar">
								<EditIcon className="icon" onClick={() => {}} value={libro.id} />
							</Tooltip>
						</IconButton>
					</td>
				</tr>
			));
			setLibrosHtml(librosAux);
		}	
	}, [libros])

	return(
		<div>
			<h2>Tu Bibiblioteca</h2>
				<table>
					<thead>
						<tr>
							<th>
								<Tooltip title= "Numero">
									<FormatList />
								</Tooltip>
							</th>
							<th>Nombre</th>
							<th>
								<Tooltip title= "Categoria ID">
									<ClassIcon />
								</Tooltip>	                    	
							</th>
							<th id='descripcion_titulo'>Descripción</th>
							<th>
								<Tooltip title= "Persona ID">
									<PersonIcon />
								</Tooltip>
							</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{librosHtml}
					</tbody>
				</table>
		</div>
	);
}

export default connect( null, { deleteLibroAction, devolverLibroAction, prestarLibroAction } )(LibrosList);

