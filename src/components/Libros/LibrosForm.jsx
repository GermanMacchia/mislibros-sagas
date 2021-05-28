import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { GET_CATEGORIAS, POST_LIBROS } from '../../sagas/types'

export default function LibrosForm ({ postLibroAction }) {
	
	const dispatch = useDispatch();
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
			dispatch({type: POST_LIBROS, props: libro})
			document.getElementById("Lregistro").reset();
			document.getElementById("Tregistro").reset();
	};

	return  (
			<div className= "homeform">
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
						<Button style={{ marginBottom: "10px", width: "20em", height: "auto"}} onClick={ handleSubmit } icon="pi pi-check" className="p-button-success" />						
					</form>
				</div>
			</div>
		);

}

