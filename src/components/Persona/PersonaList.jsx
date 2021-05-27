import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormatList from '@material-ui/icons/FormatListNumbered';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Assignment from '@material-ui/icons/AssignmentInd';

export default function PersonaList() {

    // const alert = useAlert();
    const state = useSelector( state => state.persona)
    const [personasHtml, setPersonasHtml] = useState();
    const [personas, setPersonas] = useState();

    useEffect(() => {
        setPersonas(state.payload)
    }, [state.loaded]);


    useEffect(() => {

        if (personas !== undefined) {

            const personaAux = personas.map((persona, index) => (
                <tr key={index}>
	            	<td id="indexPersona"><p><strong>{index + 1}</strong></p></td> 
	                <td id="nombrePersona"><p>{persona.nombre}</p></td>
	                <td id="apellidoPersona"><p>{persona.apellido}</p></td>    
	                <td id="emailPersona"><p>{persona.email}</p></td>
	            	<td id="aliasPersona"><p>{persona.alias}</p></td>
                    <td id="idPersona"><p>{persona.id}</p></td>
	            </tr>
            ))

            setPersonasHtml(personaAux);
        }

    }, [personas]);

    return (
        <div>
			<h2>Lista de Personas</h2>   
            {/* <Tooltip title= "Reset ID +">
                <button className="reset" ><AutorenewIcon /></button>
            </Tooltip> */}
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
		</div>
    );
}
