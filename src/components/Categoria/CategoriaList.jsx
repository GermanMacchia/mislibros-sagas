import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClassIcon from '@material-ui/icons/Class';
import FormatList from '@material-ui/icons/FormatListNumbered';
// import AutorenewIcon from '@material-ui/icons/Autorenew';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function CategoriaList () {

    const state = useSelector( state => state.categoria )
    const [categoriasHtml, setCategoriasHtml] = useState();
    const [categorias, setCategorias] = useState();

    useEffect(() => {
        setCategorias(state.payload)
    }, [state.loaded])


    useEffect(() => {

        if (categorias !== undefined) {

            const categoriaAux = categorias.map((categoria, index) => (
                <tr key={index}>
	            	<td id="indexcategoria"><p><strong>{index + 1}</strong></p></td> 
	                <td id="nombrecategoria"><p>{categoria.nombre}</p></td>
	            	<td id="aliascategoria"><p>{categoria.id}</p></td>
                    <td id="mostrarLibrosBtt"><button className="funcionBtt" value= {categoria.id}>V</button></td>
	            	<td id="deleteBtt"><button className="funcionBtt" value= {categoria.id}>X</button></td>
                    <td id="editadoBtt"><button className="funcionBtt" value= {categoria.id}>E</button></td>
	            </tr>
            ))

            setCategoriasHtml(categoriaAux);
        }

    }, [categorias])


    return (
        <div>
			<h2>Lista de categorias</h2>
            {/* <Tooltip title= "Reset ID +">
                <button style={{alignText: "left"}}className="reset" >
                    <AutorenewIcon />
                </button>
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
                        <th>
                            <Tooltip title= "Categoria ID">
                                <ClassIcon />
                            </Tooltip>                          
                        </th>
                        <th className="funcion">
                        <Tooltip title= "Ver Libros">
                                <ListAltIcon />
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
                    {categoriasHtml}
                </tbody>
            </table>
		</div>
    );
}


