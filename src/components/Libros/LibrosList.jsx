import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import EditarLibro from './EditarLibro'

import { useAlert } from 'react-alert';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import ClassIcon from '@material-ui/icons/Class';
import FormatList from '@material-ui/icons/FormatListNumbered';
import  { getLibrosAction, deleteLibroAction, devolverLibroAction, prestarLibroAction } from '../../reducers/librosDuck';

import { set } from 'react-hook-form';

function LibrosList ({ getLibrosAction, deleteLibroAction, devolverLibroAction, prestarLibroAction }) {

	const alert = useAlert();
	const state = useSelector(state => state.libros)
	const [librosHtml, setLibrosHtml] = useState();
	const [libros, setLibros] = useState();

	const handleDelete = (e) =>{
		const opcion = window.confirm('¿Seguro que quieres eliminar?');
			if(opcion == true){
					
					deleteLibroAction(e)
			}
	}

	useEffect(() => {
		if(state.error && state.error != 0){
			alert.error("No se puede eliminar un libro prestado");
		}
	}, [state.error]);

	// const handleEditar = (e) => {
	// 	e.preventDefault();
		
	// 		async function editarLibro (e) {
	// 			setEditar(<EditarLibro id={e.target.value} />);
	// 		}

	// 	editarLibro(e);
	// 	const modal = document.querySelector(".modal");
	// 	modal.style = "opacity: 1;";
	// }

	// const handlePrestar = (id) =>{

	// 	const persona = prompt('INGRESA EL ID DE LA PERSONA:');
	// 	prestarLibroAction(id, persona) 
	// }
	// 		await axios({
	// 		    method: 'put',
	// 		    url: url + `libro/prestar/` + e.target.value,
	// 		    headers: header,
	// 		    data: {
	// 		    	'id': e.target.value,
	// 		    	'persona_id': persona
	// 	    		}
	// 	    	})
	// 			.then((res) => {
	// 				alert.success(`El libro se a prestado a la persona ${persona}`)
	// 				setReload(reload + 1 )

	// 			})
	// 			.catch((error) => {
	// 			  	console.error(error)
	// 			  	alert.error("La persona no existe o El libro ya esta prestado")
	// 			})
	// 	}

	// 	async function verificarPersona () {
	// 		await axios.get(url + `persona/` + persona, {headers: header}
	// 			)
	// 		.then( (res) => {
	// 			console.log('Persona existente')
	// 			prestarLibro ();
	// 			})
	// 			.catch( (error) => {
	// 			    alert.error('Ese ID de persona no existe');
	// 			});
	// 		}

	// 	verificarPersona ();			
		
	// }


	const handleDevolver = (id) => {
		devolverLibroAction(id);
	}

	// Los useEffect renderizan primero todos (por eso alguno tiene condiciones de acceso)
	// pero luego vuelven a renderizar en orden:
	// - state.loaded
	// - libros

	useEffect(() => {
		getLibrosAction()
	}, [state.reducerChanges]);

	useEffect(() => {
		setLibros(state.payload)
	}, [state.loaded]);

	useEffect(() => {
		if(libros != undefined) {
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
								<VerticalAlignBottomIcon className="icon" onClick={() => {handleDevolver(libro.id)}} />
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
		<div className='contentList'>
			<h2>Tu Bibiblioteca</h2>
			{
				(state.loaded == false)
				?
					<>
						<br/>
						<CircularProgress id="circle" color="primary" size="70px" thickness= "7" />	
					</>
				:
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
			}
			<div className="modal">
				{}
			</div>
			
		</div>
	);
}

export default connect( null, { getLibrosAction, deleteLibroAction, devolverLibroAction, prestarLibroAction } )(LibrosList);

