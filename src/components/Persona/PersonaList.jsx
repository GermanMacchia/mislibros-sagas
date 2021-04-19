import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import EditarPersona from './EditarPersona'


import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClassIcon from '@material-ui/icons/Class';
import FormatList from '@material-ui/icons/FormatListNumbered';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Assignment from '@material-ui/icons/AssignmentInd';
import AutorenewIcon from '@material-ui/icons/Autorenew';

function PersonaList(props) {

    const alert = useAlert();
    const url = `//localhost:8000/`;
    const header = {'Authorization': props.state.AuthReducer[0].token};
    const inputForm = props.state.ChangeReducer;

    const [personasHtml, setPersonasHtml] = useState();
    const [personas, setPersonas] = useState();
    const [reload, setReload] = useState(0);
    const [editar, setEditar] = useState();


    const handleReset = (e) => {
        e.preventDefault();

        async function resetPersona() {
            await axios ({
                method: 'put',
                url: url + `p.reset`,
                headers: header
            })
            .then((res) => {
                alert.success('Se han reseteado los parametros');
            })
            .catch((error) => {
                console.error(error);
            });
        }

        resetPersona();
    }


    const handleDelete = (e) => {
        e.preventDefault();

        async function deletePersona() {
            const opcion = window.confirm('¿Seguro que quieres eliminar?');

            if (opcion == true) {
                await axios({
                        method: 'delete',
                        url: url + `persona/` + e.target.value,
                        headers: header,
                    })
                    .then((res) => {
                        alert.success('Se ha borrado correctamente')
                        setReload(reload + 1)
                    })
                    .catch((error) => {
                        console.error(error)
                        alert.error('¡La persona tiene libros asociados!')
                    });
            }
        }

        deletePersona();
    }
    

    const handleEditar = (e) => {
		e.preventDefault();
		
			async function editarPersona (e) {
				setEditar(<EditarPersona id={e.target.value} />);
			}

		editarPersona(e);       
	}
      

    const handleLista = (e) => {
            e.preventDefault();

            async function getLibrosPrestados (id){
                await axios.get(url + `libro`, {headers: header}
                )
                .then((res) => {
                    const lista = res.data.respuesta;
                    const getLibroPersona = (id) => lista.filter( (libro) => libro.persona_id == id);
                    const libroP = getLibroPersona(id);

                    if(libroP.length < 1){
                        alert.show('No tiene libros prestados')
                    }else{
                        const listaAux = libroP.map((libro, index)=>(
                            ` ${index + 1} ${JSON.stringify(libro.nombre)}`
                        ))
                        listaAux.map((libro) => {alert.success(libro)})                  
                    }}
                )
                .catch((error) => {
                   console.log(error)
                });
            }

            getLibrosPrestados(e.target.value);

    }


    useEffect(() => {

        async function getPersonas() {
            await axios.get(url + `persona`, {headers: header}
                )
                .then((res) => {
                    setPersonas(res.data.respuesta)
                })
                .catch((error) => {
                    console.error(error)
                });
        }

        getPersonas();

    }, [inputForm, reload]);


    useEffect(() => {

        if (personas != undefined) {

            const personaAux = personas.map((persona, index) => (
                <tr key={index}>
	            	<td id="indexPersona"><p><strong>{index + 1}</strong></p></td> 
	                <td id="nombrePersona"><p>{persona.nombre}</p></td>
	                <td id="apellidoPersona"><p>{persona.apellido}</p></td>    
	                <td id="emailPersona"><p>{persona.email}</p></td>
	            	<td id="aliasPersona"><p>{persona.alias}</p></td>
                    <td id="idPersona"><p>{persona.id}</p></td>
                    <td id="librosPrestados"><button  className="funcionBtt" onClick={handleLista} value= {persona.id}>O</button></td>
	            	<td id="deleteBtt"><button  className="funcionBtt" onClick={handleDelete} value= {persona.id}>X</button></td>
                    <td id="editarBtt"><button  className="funcionBtt" onClick={handleEditar} value= {persona.id}>E</button></td>
	            </tr>
            ))

            setPersonasHtml(personaAux);
        }

    }, [personas]);

    return (
        <div className='contentList'>
			<h2>Lista de Personas</h2>
            <Tooltip title= "Reset ID +">
                <button className="reset" onClick= { handleReset }><AutorenewIcon /></button>
            </Tooltip> 
			<table>
				<thead>
					<tr>
                        <th>
                            <Tooltip title= "Numero">
                                <FormatList />
                            </Tooltip>
                        </th>
	                    <th>Nombre</th>
	                    <th>Apellido</th>
                        <th>
                            <Tooltip title= "Email">
                                <EmailIcon />
                            </Tooltip>
                        </th>
                        <th>
                            <Tooltip title= "Alias">
                                <Assignment />
                            </Tooltip>
                        </th>
                        <th>
                            <Tooltip title= "Persona ID">
                                <PersonIcon />
                            </Tooltip>
                        </th>
                        <th className="funcion">
                            <Tooltip title= "Prestados">
                                <MenuBookIcon />
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
	                {personasHtml}
	            </tbody>
	        </table>
            {editar}
		</div>
    );
}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(PersonaList);