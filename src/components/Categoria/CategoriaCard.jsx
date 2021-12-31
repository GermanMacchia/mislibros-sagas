import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import imagen from '../../assets/shelve.jpg'

export default function CategoriaCard({ nombre, imagen, descripcion}) {

    const header = (
        <img alt="Card" style={{width: '15rem' }} src={imagen}  alt='imagen' />
    );
    const footer = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />
        </span>
    );

    return (
        <div>
            <Card title={nombre} style={{ width: '25em' }} footer={footer} header={header}>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>{descripcion}</p>
            </Card>
        </div>
    )
}