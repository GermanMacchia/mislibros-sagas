import React, { useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { useCategorias, useDataQuery } from '../../hooks'


export default function CategoriaForm () {

	const { categorias, libros } = useDataQuery()
	const { handleForm, handleSubmit } = useCategorias()

	useEffect( () => {
		if( categorias.reload ) {
			document.getElementById( 'categoriaForm' ).reset()
		}
	}, [ categorias.reload ] )

	return (
		<div id="catForm">
			{/* Formulario */ }
			<form action="Post Categoría">
				<label htmlFor="categoria">Nueva Categoría</label><br />
				<InputText name='nombre' className="p-inputtext-mb p-d-block txt" onChange={ handleForm } /><br />

				<label htmlFor="imagen">Dirección de Imagen</label><br />
				<InputText name='imagen' className="p-inputtext-mb p-d-block txt" onChange={ handleForm } /><br />

				<label htmlFor="description">Descripción</label><br />
				<InputTextarea name="descripcion" required rows={ 4 } cols={ 18 } className='p-inputtext-mb p-d-block txt' onChange={ handleForm } /><br />
			</form>
			{/* Botones */ }
			{ libros.fetching ?
				<Button id="loading" loading loadingOptions={ { position: 'right' } } className="p-button-secondary p-ml-2" />
				:
				<Button label="Crear" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={ handleSubmit } />
			}
		</div>
	)
}