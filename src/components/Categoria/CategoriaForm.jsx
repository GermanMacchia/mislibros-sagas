import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { useCategorias } from '../../hooks'
import { Accordion, AccordionTab } from 'primereact/accordion'

const titulo = (
	<>
		<i style={ { marginRight: "10px" } } className="pi pi-bookmark" />
		Crear Categoria
	</>
)

export default function CategoriaForm () {

	const { handleForm, handleSubmit } = useCategorias()

	return (
		<Accordion style={ { width: "55vw" } } activeIndex={ 1 }>
			<AccordionTab header={ titulo }>
				<div id="catForm">
					{/* Formulario */ }
					<form action="Post Categoría" id='categoriaForm'>
						<label htmlFor="categoria">Nueva Categoría</label><br />
						<InputText name='nombre' className="p-inputtext-mb p-d-block txt" onChange={ handleForm } /><br />

						<label htmlFor="imagen">Dirección de Imagen</label><br />
						<InputText name='imagen' className="p-inputtext-mb p-d-block txt" onChange={ handleForm } /><br />

						<label htmlFor="description">Descripción</label><br />
						<InputTextarea name="descripcion" required rows={ 4 } cols={ 18 } className='p-inputtext-mb p-d-block txt' onChange={ handleForm } /><br />
					</form>
					<Button label="Crear" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={ handleSubmit } />
				</div>
			</AccordionTab>
		</Accordion>
	)
}