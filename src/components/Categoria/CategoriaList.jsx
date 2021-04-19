import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import EditarCategoria from './EditarCategoria';
import VerLibros from './VerLibros';

import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClassIcon from '@material-ui/icons/Class';
import FormatList from '@material-ui/icons/FormatListNumbered';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ListAltIcon from '@material-ui/icons/ListAlt';

function CategoriaList (props) {

    const alert = useAlert()
    const url = `//localhost:8000/`;
    const header = {'Authorization': props.state.AuthReducer[0].token};

    const [categoriasHtml, setCategoriasHtml] = useState();
    const [categorias, setCategorias] = useState();
    const [reload, setReload] = useState(0);
    const [editar, setEditar] = useState("");
    const [verLibros, setVerLibros] = useState("");

    const handleReset = (e) => {
        e.preventDefault();

        async function resetCategoria() {
            await axios ({
                method: 'put',
                url: url +`c.reset`,
                headers: header
            })
            .then((res) => {
                alert.success('Se han reseteado los parametros');
                setReload(reload + 1);
            })
            .catch((error) => {
                console.error(error)
            });
        }

        resetCategoria();
    } 


    const handleDelete = (e) => {
        e.preventDefault()

        async function deleteCategoria() {
            const opcion = window.confirm('¿Seguro que quieres eliminar?')
            
            if (opcion == true) {
                await axios({
                        method: 'delete',
                        url: url + `categoria/` + e.target.value,
                        headers: header
                    })
                    .then((res) => {
                        alert.success('Se ha borrado correctamente')
                        setReload(reload + 1)

                    })
                    .catch((error) => {
                        console.error(error)
                        alert.error('¡No se puede borrar! Esta categoria tiene libros asociados!')
                    });
            }
        }

        deleteCategoria();
    }


    const handleEditar = (e) => {
		e.preventDefault()
		
			async function editarCategoria (e) {
				setEditar(<EditarCategoria id={e.target.value} />);
			}

		editarCategoria(e);
        const modal = document.querySelector(".modal");
		modal.style = "opacity: 1;";          
	}

    const handleVerLibros = (e) => {
        e.preventDefault();
        const id = e.target.value;

        async function getLibrosCat (id){
                await axios.get(url + `libro`, {headers: header}
                )
                .then((res) => {
                    const lista = res.data.respuesta;
                    const getLibroCategoria = (id) => lista.filter( (libro) => libro.categoria_id == id);
                    const libroC = getLibroCategoria(id);

                    if(libroC.length < 1){
                        alert.show('La categoria no tiene libros asociados')
                    }else{
                        const listaAux = libroC.map((libro, index)=>(
                            ` ${index + 1} ${JSON.stringify(libro.nombre)}`
                        ))
                        listaAux.map((libro) => {alert.success(libro)})                  
                    }}
                )
                .catch((error) => {
                   console.log(error)
                });
            }

        getLibrosCat(e.target.value);
}


    useEffect(() => {

        async function getCategorias() {
            await axios.get(url + `categoria`, {headers: header})
                .then((res) => {
                    setCategorias(res.data.respuesta)
                })
                .catch((error) => {
                    console.error(error)
                });
        }

        getCategorias();

    }, [props.state.ChangeReducer, reload])



    useEffect(() => {

        if (categorias != undefined) {

            const categoriaAux = categorias.map((categoria, index) => (
                <tr key={index}>
	            	<td id="indexcategoria"><p><strong>{index + 1}</strong></p></td> 
	                <td id="nombrecategoria"><p>{categoria.nombre}</p></td>
	            	<td id="aliascategoria"><p>{categoria.id}</p></td>
                    <td id="mostrarLibrosBtt"><button className="funcionBtt" onClick={handleVerLibros} value= {categoria.id}>V</button></td>
	            	<td id="deleteBtt"><button className="funcionBtt" onClick={handleDelete} value= {categoria.id}>X</button></td>
                    <td id="editadoBtt"><button className="funcionBtt"  onClick={handleEditar} value= {categoria.id}>E</button></td>
	            </tr>
            ))

            setCategoriasHtml(categoriaAux);
        }

    }, [categorias])


    return (
        <div className='contentList'>
			<h2>Lista de categorias</h2>
            <Tooltip title= "Reset ID +">
                <button className="reset" onClick= { handleReset }>
                    <AutorenewIcon />
                </button>
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
            <div className="modal">
				{editar}
			</div>
		</div>
    );
}

const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(CategoriaList);