import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EditarLibro from './EditarLibro'
import { connect, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import ClassIcon from '@material-ui/icons/Class';
import FormatList from '@material-ui/icons/FormatListNumbered';
import  { getLibrosAction, deleteLibroAction } from '../../reducers/librosDuck';

function LibrosList ({ getLibrosAction, deleteLibroAction }) {

	// const alert = useAlert();

	const state = useSelector(state => state.libros)
	const [librosHtml, setLibrosHtml] = useState();
	const [libros, setLibros] = useState();


	const handleDelete = (e) =>{
		const opcion = window.confirm('¿Seguro que quieres eliminar?');
			if(opcion == true){
				deleteLibroAction(e.target.value)
			}
	}

	// const handleEditar = (e) => {
	// 	e.preventDefault();
		
	// 		async function editarLibro (e) {
	// 			setEditar(<EditarLibro id={e.target.value} />);
	// 		}

	// 	editarLibro(e);
	// 	const modal = document.querySelector(".modal");
	// 	modal.style = "opacity: 1;";
	// }

	// const handlePrestar = (e) =>{
	// 	e.preventDefault();

	// 	const persona = prompt('INGRESA EL ID DE LA PERSONA:');

	// 	async function prestarLibro () {
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


	// const handleDevolver = (e) => {
	// 	e.preventDefault();

	// 	async function devolverLibro () {
	// 			await axios({
	// 			    method: 'put',
	// 			    url: url + `libro/devolver/` + e.target.value,
	// 			    headers: header
	// 			    })
	// 			.then((res) => {
	// 				alert.success("El libro a vuelto a tu bibiblioteca")
	// 				setReload(reload + 1 )
	// 			})
	// 			.catch((error) => {
	// 			  	console.error(error)
	// 			  	alert.show("El libro no esta prestado")
	// 			}
	// 	)}

	// 	devolverLibro();
	// }

	// Los useEffect renderizan primero todos (por eso alguno tiene condiciones de acceso)
	// pero luego vuelven a renderizar en orden:
	// - state.loaded
	// - libros

	useEffect(() => {
		getLibrosAction()
	}, [state.globalChange]);

	useEffect(() => {
		setLibros(state.payload)
	}, [state.loaded])

	useEffect(() => {
		if(libros != undefined) {
			const librosAux = libros.map((libro, index) => (
				<tr key={index}>
					<td id="indexlibro"><p><strong>{index + 1}</strong></p></td>
					<td id="nombrelibro"><p>{libro.nombre}</p></td>
					<td id="categorialibro"><p>{libro.categoria_id}</p></td>
					<td id="descripcionlibro"><p>{libro.descripcion}</p></td>
					<td id="personalibro"><p>{libro.persona_id}</p></td>
					<td id="prestarbtt"><button className="funcionBtt" value={libro.id}>P</button></td>
					<td id="devolverbtt"><button className="funcionBtt"  value={libro.id}>↕</button></td>
					<td id="borrarbtt"><button className="funcionBtt" onClick={handleDelete} value={libro.id}>X</button></td>
					<td id="editarbtt"><button className="funcionBtt"  value={libro.id}>E</button></td>
				</tr>
			))

			setLibrosHtml(librosAux);
		}	
	}, [libros])

	return(
		<div className='contentList'>
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
	                    <th className="funcion">
	                    	<Tooltip title= "Prestar">
	                    		<MenuBookIcon />
	                    	</Tooltip>
	                    </th>
	                    <th className="funcion">
	                    	<Tooltip title= "Devolver">
	                    		<VerticalAlignBottomIcon />
	                    	</Tooltip>
	                    </th>
	                    <th className="funcion">
	                    	<Tooltip title= "Borrar">
	                    		<DeleteIcon />
	                    	</Tooltip>
	                    </th>
						<th className="funcion">
							<Tooltip title= "Editar">
	                    		<EditIcon />
	                    	</Tooltip>
	                    </th>            
	                </tr>
                </thead>
	            <tbody>
	                {(state.loaded == false)?
					<h3 style={{color:"white"}} >Cargando...</h3>
				:
				librosHtml}
	            </tbody>
	        </table>
			<div className="modal">
				{}
			</div>
			
		</div>
	);
}



export default connect( null, { getLibrosAction, deleteLibroAction } )(LibrosList);

