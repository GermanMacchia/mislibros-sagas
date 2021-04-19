import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

function EditarCategoria (props) {
	
	const alert = useAlert();
	const url = `//localhost:8000/`;
	const header = {'Authorization': props.state.AuthReducer[0].token};

	const [newPost, setNewPost] = useState(0);	
	const [editado, setEditados] = useState("");	
	const [edit, setEdit] = useState({
			nombre: " "
		});

	
    useEffect(() => {
		
		async function getCategorias () { 
			await axios.get( url + `categoria/`+ props.id, {headers: header})
				.then((res) => {
				  setEditados(res.data.respuesta[0])
				})
				.catch((error) => {
				  console.error(error)
				});

				
			}
			
		getCategorias ();
		document.querySelector("#Cregistro").reset();

    }, [props.id])
	
	

	const handleEditarCategoria = (e) => {
		setEdit({
			...edit,
			[e.target.name]: e.target.value
			
		});
		
	}
	

	const handleSubmit = (e) => {
		e.preventDefault();	

		async function putCategorias () { 
				await axios({
				    method: 'put',
				    url: url + `categoria/`+ props.id,
				    data: edit,
				    headers: header
				    })
				.then((res) => {
					alert.success(`Categoria Editada`)
					setNewPost(newPost + 1);
					props.onSave(newPost);
					cerrarModal();
				})
				.catch((error) => {
					alert.error("La categoria ya existe, o tiene libros asociados")
				 	console.error(error)
				});
		}

		putCategorias ();
		const modal = document.querySelector(".modal");
		modal.style = "opacity: 0;";
	}
	

	useEffect(() => {
		
		if(editado != undefined){
	        setEdit({
				nombre: editado.nombre
			})
		}
		
	}, [editado])
	

	return(		
			<div className = "homeform">
				<a href="#" onClick={cerrarModal}>X</a>
				<h2>Ingresar una categoria</h2>
					<form id="Cregistro">
						<label>Categoria</label><br/><br/>
						<input type="text" name="nombre" onChange={handleEditarCategoria} placeholder={editado.nombre}/><br/><br/>
						<input type= "submit" id='editar_button' onClick= {handleSubmit} value= "Editar" />
					</form>
			</div>	
		)

	
}

function cerrarModal(){
	const modal = document.querySelector(".modal");
	modal.style = "opacity: 0;";		
}

const mapStateToProps = (state) =>{
	return {state}
}
const mapActionsToProps = (dispatch) => {
	return {onSave: (newPost) => dispatch({type:'CHANGE', data: newPost})}
}

export default connect(mapStateToProps, mapActionsToProps)(EditarCategoria);
