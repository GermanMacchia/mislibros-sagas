/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_LIBROS, TOAST } from '../sagas/types'

export const useLibroList = () => {
	const librosList = useSelector( state => state.libros )
	const categorias = useSelector( state => state.categoria.payload )
	const personas = useSelector( state => state.persona.payload )
	const [ libros, setLibros ] = useState( [] )
	const dispatch = useDispatch()

	useEffect( () => {
		if( librosList ) {
			formatearArray()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ librosList ] )

	function getNombreCategoria ( categoria_id ) {
		const [ categoriaAux ] = categorias.filter( c => c.id === categoria_id )
		return categoriaAux.nombre
	}

	function getNombrePersona ( persona_id ) {
		let persona = ''
		if( persona_id !== null ) {
			const [ personaAux ] = personas.filter( c => c.id === persona_id )
			persona = ` a ${ personaAux.nombre } ${ personaAux.apellido }`
		}
		return persona
	}

	function getEstadoLibro ( persona_id ) {
		let estado
		if( persona_id !== null ) {
			estado = "Prestado"
		} else {
			estado = "Disponible"
		}
		return estado
	}

	// FUNCION PARA FILTRAR ID CATEGORIAS Y PRESTADO/EN BIBIOTECA / 
	// (de la API llegan con numeros de id relacional)
	function formatearArray () {
		if( librosList.payload && categorias && personas ) {
			const libros = [ ...librosList.payload ]
			const array = []
			// Por cada libro voy a crear un objeto distinto al que hay en 
			// el servidor para mejorar la presentación de la tabla
			libros.forEach( e => {
				const objeto = {
					id: e.id,
					nombre: e.nombre,
					categoria: getNombreCategoria( e.categoria_id ),
					nombrePersona: getNombrePersona( e.persona_id ),
					descripcion: e.descripcion,
					persona_id: e.persona_id,
					categoria_id: e.categoria_id,
					autor: e.autor,
					rating: e.rating,
					estado: getEstadoLibro( e.persona_id )
				}
				array.push( objeto )
			} )
			setLibros( array )
		}
	}

	const deleteSelectedProducts = ( selectedProducts, setDeleteProductsDialog, setSelectedProducts ) => {
		// Los libros a Borrar debe ser los que NO están prestados
		const librosABorrar = selectedProducts.filter( libro => libro.persona_id == null )

		const retornarLista = ( aBorrar ) => {
			const nombres = aBorrar.map( element => {
				return element.nombre
			} )
			return nombres
		}

		if( !librosABorrar.length ) {
			dispatch( {
				type: TOAST,
				info: {
					severity: 'info',
					summary: 'Atención',
					detail: 'Los libros prestados no pueden eliminarse'
				}
			} )
		}

		if( selectedProducts.length > librosABorrar.length && selectedProducts.length !== 1 ) {
			// ALGUNOS
			dispatch( {
				type: TOAST,
				info: {
					severity: 'warn',
					summary: 'Prestados no pueden eliminarse',
					detail: 'Se ha eliminado: ' + retornarLista( librosABorrar ).toString()
				}
			} )
		}

		if( selectedProducts.length === librosABorrar.length ) {
			dispatch( {
				type: TOAST,
				info: {
					severity: 'success',
					summary: 'Libros Eliminados',
					detail: retornarLista( librosABorrar ).toString()
				}
			} )
		}

		librosABorrar.forEach( e => {
			dispatch( { type: DELETE_LIBROS, props: e.id } )
		} )

		setDeleteProductsDialog( false )
		setSelectedProducts( null )
	}
	return {
		libros,
		categorias,
		personas,
		deleteSelectedProducts
	}
}
