/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_LIBROS, TOAST } from '../sagas/types'

export const useLibros = () => {

	const librosList = useSelector( state => state.libros.payload )
	const categorias = useSelector( state => state.categoria.payload )
	const personas = useSelector( state => state.persona.payload )
	const [ libros, setLibros ] = useState( [] )
	const dispatch = useDispatch()

	const getNombre = ( id, array, persona ) => {
		const searched = array.find( ele => ele.id === id )
		if( !searched ) return
		if( persona ) return ` ${ searched?.nombre } ${ searched?.apellido }`

		return searched?.nombre
	}

	useEffect( () => {
		if( librosList && categorias && personas ) {
			const auxArray = []
			// Por cada libro voy a crear un objeto distinto al que hay en 
			// el servidor para mejorar la presentación de la tabla
			librosList.forEach( e => {
				const libro = {
					id: e.id,
					nombre: e.nombre,
					categoria: getNombre( e.categoria_id, categorias ),
					nombrePersona: getNombre( e.persona_id, personas, true ),
					descripcion: e.descripcion,
					persona_id: e.persona_id,
					categoria_id: e.categoria_id,
					autor: e.autor,
					rating: e.rating,
					estado: e.persona_id ? 'Prestado' : 'Disponible'
				}
				auxArray.push( libro )
			} )
			setLibros( auxArray )
		}
	}, [ categorias, librosList, personas ] )

	// Los libros a Borrar debe ser los que NO están prestados
	const deleteSelectedProducts = ( selectedProducts, setDeleteProductsDialog, setSelectedProducts ) => {

		const librosABorrar = selectedProducts.filter( libro => libro.persona_id == null )
		const nombresLibros = librosABorrar.map( element => element.nombre )

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

		if( librosABorrar.length && selectedProducts.length > librosABorrar.length ) {
			dispatch( {
				type: TOAST,
				info: {
					severity: 'warn',
					summary: 'Prestados no pueden eliminarse',
					detail: 'Se ha eliminado: ' + nombresLibros.toString()
				}
			} )
		}

		if( selectedProducts.length === librosABorrar.length ) {
			dispatch( {
				type: TOAST,
				info: {
					severity: 'success',
					summary: 'Libros Eliminados',
					detail: nombresLibros.toString()
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
