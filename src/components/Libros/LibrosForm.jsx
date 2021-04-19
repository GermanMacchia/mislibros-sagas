import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { Fab } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';


function LibrosForm (props) {

	const alert = useAlert();
	const url = `//localhost:8000/`;
	const header = {'Authorization': props.state.AuthReducer[0].token};


	const [categoria, setCategoria] = useState([]);
	const [persona, setPersona] = useState([])
	const [newPost, setNewPost] = useState(0);
	const [libro, setLibro] = useState({
		    nombre: " ",
		    descripcion: " ",
		    categoria_id: " ",
		    persona_id: null
	});
	

	useEffect(() => {

		async function getCategorias() {
	        await axios.get(url + `categoria`, {headers: header})
	            .then((res) => {
	                setCategoria(res.data.respuesta);
	            })
	            .catch((error) => {
	                console.error(error);
	            });
	        };
	    
	    async function getPersonas() {
	        await axios.get(url + `persona`, {headers: header})
	            .then((res) => {
	                setPersona(res.data.respuesta);
	            })
	            .catch((error) => {
	                console.error(error);
	            })
	        };


	    getCategorias();
	    getPersonas();

	}, []);


	const handleNuevoLibro = (e) => {
		setLibro({
			...libro,
			[e.target.name]: e.target.value
			
		});
	};

				
	const handleSubmit = (e) => {
			e.preventDefault();	

			async function postLibros () { 
					await axios({
					    method: 'post',
					    url: url + 'libro',
					    data: libro,
					    headers: header
					})
					.then((res) => {
						alert.success(`Libro agregado`)
						setNewPost(newPost + 1);
						props.onSave(newPost);
						document.getElementById("Lregistro").reset();
						document.getElementById("Tregistro").reset();
					})
					.catch((error) => {
					  console.error(error)
					  alert.error("Debes completar todos los campos");
					});
				};

			postLibros ();
			document.getElementById("Lregistro").reset();
			document.getElementById("Tregistro").reset();
	};
	
	const opcion = categoria.map((categorias, index) =>{
		return <option key= {index} value = {categorias.id} >{categorias.nombre}</option>		
	});

	const opcionPersona = persona.map((personas, index) =>{
		return <option key= {index} value = {personas.id} >{personas.nombre}</option>		
	});

	return  (
			<div className= "homeform">
				<h2>Ingresar un libro</h2>
				<div className="floatLeft">
					<form id="Lregistro">
						<label>Nombre </label><br/>
						<input type="text" name="nombre" onChange={handleNuevoLibro} placeholder="Nombre del libro" /><br/>

						<label>Categoria </label><br/>
						<select name="categoria_id" id="categoria" onChange={handleNuevoLibro} >
						<option value="">Seleccionar:</option>
							{opcion}	
						</select>

						<label>Persona</label><br/>
						<select name="persona_id" id="persona" onChange={handleNuevoLibro} >
						<option value="">Seleccionar:</option>
							{opcionPersona}	
						</select><br/>
					</form>
				</div>
				<div className="bigtext">
					<form id= "Tregistro">
						<label className="descripcion" >Descripcion </label><br/>
						<textarea type="textarea" name="descripcion" onChange={handleNuevoLibro} placeholder="Descripcion" /><br/><br/>
						<Fab color="primary">
							<AddCircleIcon fontSize="large" type= "submit" onClick={handleSubmit} />
						</Fab>						
					</form>
				</div>
			</div>
		);

}

const mapStateToProps = (state) =>{
	return {state}
};
const mapActionsToProps = (dispatch) => {
	return {onSave: (newPost) => dispatch({type:'CHANGE', data: newPost})}
};

export default connect(mapStateToProps, mapActionsToProps)(LibrosForm);



