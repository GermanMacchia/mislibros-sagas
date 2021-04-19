import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

function EditarLibro (props) {
	
	const alert = useAlert();
	const url = `//localhost:8000/`;
	const header = {'Authorization': props.state.AuthReducer[0].token};

	const [newPost, setNewPost] = useState(0);
	const [editado, setEditados] = useState({});	
	const [edit, setEdit] = useState({
		nombre: " ",
		descripcion: " ",
		categoria_id: " ",
		persona_id: ""
		});

		
    useEffect(() => {
		
		async function getLibros () { 
			await axios.get(url + `libro/`+ props.id, {headers: header})
				.then((res) => {
				  setEditados(res.data.respuesta[0]);
				})
				.catch((error) => {
				  console.error(error);
				});
			}
			
		getLibros ();

    }, [props.id])
	

	const handleEditarLibro = (e) => {
		setEdit({
			...edit,
			[e.target.name]: e.target.value
		});
	}
	

	const handleSubmit = (e) => {
		e.preventDefault();	

		async function putLibros () { 
				await axios({
				    method: 'put',
				    url: url + `libro/`+ props.id,
				    data: edit,
				    headers: header
				    })
				.then((res) => {
					alert.success(`Libro editado`)
					setNewPost(newPost + 1);
					props.onSave(newPost);
					document.getElementById("Ledit").reset();
					document.getElementById("Tedit").reset();
					cerrarModal();
				})
				.catch((error) => {
				  console.error(error)
				});
		}

		putLibros ();
	}
	

	useEffect(() => {
		
		if(editado != undefined){
	        setEdit({
				nombre: editado.nombre,
				descripcion: editado.descripcion,
				categoria_id: editado.categoria_id,
				persona_id: editado.persona_id
			})
		}
		
	}, [editado])
	

	return (		
			<div className = "homeform">
				<a href="#" onClick={cerrarModal}>X</a>
				<h2>Editar libro</h2>
				<div className="floatLeft">
					<form id="Ledit">
						<label>Nombre </label><br/>
						<input type="text" name="nombre" onChange={handleEditarLibro} placeholder={editado.nombre} disabled/><br/>
						<label>Categoria </label><br/>
						<input type="text" name="categoria_id" onChange={handleEditarLibro} placeholder={editado.categoria_id} disabled/><br/>
						<label>Persona</label><br/>
						<input type="text" name="persona_id" onChange={handleEditarLibro} placeholder={editado.persona_id} disabled /><br/>
					</form>
				</div>
				<div className="bigtext">
					<form id="Tedit">
						<label className="descripcion" >Descripcion </label><br/>
						<textarea type="textarea" name="descripcion" id="descripcionEdit" onChange={handleEditarLibro} placeholder={editado.descripcion} /><br/><br/>
						<input type= "submit" id='editar_button' onClick= {handleSubmit} value= "Editar" />
					</form>
				</div>
			</div>	
		);
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

export default connect(mapStateToProps, mapActionsToProps)(EditarLibro);
