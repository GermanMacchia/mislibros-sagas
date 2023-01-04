import { Card } from 'primereact/card'
import { Button } from 'primereact/button'


export default function CategoriaCard ( { categoria, openDelete } ) {

    const header = (
        <img alt="Imagen" style={ { width: '10rem', margin: '1rem' } } src={ categoria.imagen } />
    )

    const footer = (
        <span>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={ () => { openDelete( categoria ) } } />
        </span>
    )

    return (
        <div id="tarjetas">
            <Card title={ categoria.nombre } footer={ footer } header={ header }>
                <p className="p-m-0" style={ { lineHeight: '1.5' } }>{ categoria.descripcion }</p>
            </Card>
        </div>
    )
}