import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Fab } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { postLibroAction } from '../../reducers/librosDuck';
import { getPersonaAction } from '../../reducers/personaDuck';
import { getCategoriasAction } from '../../reducers/categoriaDuck';

function LibrosForm ({ postLibroAction, getPersonaAction, getCategoriasAction }) {

	const alert = useAlert();
	const state = useSelector(state => state)
	const [opcionP, setOpcionP] = useState();
	const [opcionC, setOpcionC] = useState();
	const [categoria, setCategoria] = useState([]);
	const [persona, setPersona] = useState([])
	const [libro, setLibro] = useState({
		    nombre: " ",
		    descripcion: " ",
		    categoria_id: " ",
		    persona_id: null
	});
	
	useEffect(() => {
		//LLAMADAS API
	    getCategoriasAction();
	    getPersonaAction();
	}, []);

	useEffect(() => {
		//SET LUEGO DE LA LLAMADA
		if(state.categoria.loaded && state.persona.loaded){
			setCategoria(state.categoria.payload)
			setPersona(state.persona.payload)
		}
	}, [state.categoria.loaded, state.persona.loaded]);

	useEffect(() => {
		//CONFIGURACION DE OPCIONES
		if(state.categoria.loaded && state.persona.loaded){
			//OPCION CATEGORIA
			const opcionAuxC = categoria.map((categorias, index) =>{
			return <option key= {index} value = {categorias.id} >{categorias.nombre}</option>		
			});
			setOpcionC(opcionAuxC)
			//OPCION PERSONA
			const opcionAuxP = persona.map((personas, index) =>{
			return <option key= {index} value = {personas.id} >{personas.nombre}</option>		
			});
			setOpcionP(opcionAuxP)
		}
	}, [categoria]);

	const handleNuevoLibro = (e) => {
		//SET LIBRO DESDE EL FORMS
		setLibro({
			...libro,
			[e.target.name]: e.target.value
			
		});
	};
	//SUBMIT
	const handleSubmit = (e) => {
			e.preventDefault();	
			postLibroAction (libro);
			document.getElementById("Lregistro").reset();
			document.getElementById("Tregistro").reset();
	};


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
							{opcionC}	
						</select>

						<label>Persona</label><br/>
						<select name="persona_id" id="persona" onChange={handleNuevoLibro} >
						<option value="">Seleccionar:</option>
							{opcionP}	
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

export default connect( null, { postLibroAction, getPersonaAction, getCategoriasAction } )(LibrosForm);