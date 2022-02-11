import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'
import { TOAST, DELETE_PERSONA } from '../../sagas/types';
import ModalPersona from './ModalPersona';
import ModalEditPersona from './ModalEditPersona';
import Spinner from '../utilities/Spinner';

export default function Lista(){

    const dispatch = useDispatch();
    const state = useSelector(state => state.persona)
    const stateLibros = useSelector(state => state.libros.payload)

//INGRESO LISTA DE PRODUCTOS INICIAL  
    const [personas, setPersonas] = useState()
//VISIBILIDAD DEL MODAL DE LIBROS NUEVOS / EDIT
    const [personaModal, setPersonaModal] = useState(false);
    const [personaEditModal, setPersonaEditModal] = useState(false);
//BORRAR PRODUCTO INDIVIDUAL
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
//BORRAR SELECCION MULTIPLE
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
//INGRESO A MODAL Y ELECCION INDIVIDUAL: VER LIBROVACIO
    const [persona, setPersona] = useState()
//SELECTORES POR CASILLA
    const [personasSeleccionadas, setPersonasSeleccionadas] = useState(null);
//INGRESOS DEL MODAL
    const [submitted, setSubmitted] = useState(false);
    const [submitEdit, setSubmitEdit] = useState(false);
//FILTRO DEL HEADER 
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    //ABRIR EL MODAL DE INGRESO NUEVO
    const openNew = () => {
        //setLibro(libroVacio);
        setSubmitted(false);
        setPersonaModal(true);
    }
//INGRESO INICIAL DE PRODUCTOS A LISTA
    useEffect(() => {
        if(state.loaded){
            setPersonas(state.payload)
        }
    }, [personas, state]);

//CERRAR MODAL SIN GUARDAR
    const hideDialog = () => {
        setPersonaModal(false);
    }
    
    const hideEditDialog = () => {
        setPersonaEditModal(false)
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const confirmEditPersona = (persona) => {
        setSubmitEdit(false)
        setPersonaEditModal(true);
        setPersona(persona)
    }
    
    //MODAL CONFIRMACION BORRAR INDIVIDUAL
    const confirmDeletePersona = (personaFila) => {
        setPersona(personaFila);
        setDeleteProductDialog(true);
    }

    //BORRAR PRODUCTO INDIVIDUAL UNA VEZ CONFIRMADO
    const deletePersona = () => {
        dispatch({type:DELETE_PERSONA, props:persona.id})
        setDeleteProductDialog(false);
        setPersona(null); 
    }
    //MODAL CONFIRMACION BORRAR MULTIPLES
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }
    // ESCONDER MODAL DE COMFIRMACIÓN
    const hideDeletePersonasDialog = () => {
        setDeleteProductsDialog(false);
    }


//----------------------------------------BOTONERA IZQUIERDA SUPERIOR------------------------------------------------------------
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2 nuevobtn" onClick={openNew} />
                <Button label="Borrar" icon="pi pi-trash" className="p-button-danger borrarbtn" onClick={confirmDeleteSelected} disabled={!personasSeleccionadas || !personasSeleccionadas.length} />
                <InputText className="searchbtn" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </React.Fragment>
        )
    }



//----------------------------------------------- INDICACIONES A LA FILA HORIZONTAL--------------------------------


    //OPCIONES DE CADA FILA {EDICION y BORRAR}
    const actionBodyTemplate = (rowData) => {
        return (
            
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => confirmEditPersona(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeletePersona(rowData)} />
            </React.Fragment>
        );
    }

    //FOOTER DE CONFIRMACION PARA BORRAR PRODUCTO INDIVIDUAL 
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePersona} />
        </React.Fragment>
    );

    const retornarPersonasBorrables = () => {
        var personas = []
        var noborrables = []
        personasSeleccionadas.forEach( persona => {
            var libros = stateLibros.filter( libro => libro.persona_id === persona.id)
            if(libros.length === 0){
                personas.push(persona.id)
            }else{
                noborrables.push(persona.nombre)
            }
        });
        if( noborrables.length !== 0){
            dispatch({
                        type:TOAST, 
                        info: { 
                            severity: 'warn', 
                            summary: 'Cuidado', 
                            detail: noborrables.join() + " figura con prestamos"
                        } })
        }
        return personas
    }

    const deletePersonasSeleccionadas = () => {
        //Las personas a Borrar no deben tener libros prestados
        var idPersonas = retornarPersonasBorrables()

        if(idPersonas.length !== 0){
            idPersonas.forEach( id => {
                dispatch({
                type: DELETE_PERSONA, 
                props: id
                })
            })
        }
        hideDeletePersonasDialog()
    }

    //FOOTER DE CONFIRMACION PARA BORRAR PRODUCTOS MULTIPLES  
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => {hideDeletePersonasDialog()}} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => {deletePersonasSeleccionadas()}} />
        </React.Fragment>
    );


    //RENDER----------------------------------------------------------------------------------------------------------
    return (
        <div className="datatable-crud-demo">
            <div className="card">
                {/*BOTONERA SUPERIOR*/}
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
                {/*ESTRUCTURA DE TABLA*/}
                { state.loaded ?
                    <DataTable                    
                        ref={dt} 
                        //VALORES DE LAS TABLAS
                        value={personas} 
                        //SELECCION POR CASILLA-
                        selectionMode="checkbox" 
                        //HOOK, FUNCION y DATAKEY! REFERENCIA DENTRO DEL JSON
                        selection={personasSeleccionadas} onSelectionChange={(e) => setPersonasSeleccionadas(e.value)} dataKey="id"
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} to {last} de {totalRecords} Personas"
                        globalFilter={globalFilter}
                        >
                        {/*SELECCION POR CASILLA */}
                        {/* FIELD = AGARRA EL VALOR DEL OBJETO INGRESADO EN <Datatable> Value - REFERENCIA DEL JSON*/}
                        <Column selectionMode="multiple" headerStyle={{ width: '0.3rem' }}></Column>
                        <Column className="column" field="nombre" header="Nombre" sortable></Column>
                        <Column className="column" field="apellido" header="Apellido" sortable></Column>
                        <Column className="column" field="email" header="Email" sortable></Column>
                        <Column className="column" field="alias" header="Alias" sortable></Column>                
                        {/* OPCIONES BOORRAR Y EDIT*/}
                        <Column className="column" body={actionBodyTemplate}></Column> 
                    </DataTable>
                    :
                    <Spinner />
                }
            </div>    

            {/*MODAL LIBRO NUEVO*/}  
            {personaEditModal?                
                <ModalEditPersona hideEditDialog={hideEditDialog} submitEdit={submitEdit} personaEditModal={personaEditModal} personaUpdate={persona}/>
                :
                <ModalPersona hideDialog={hideDialog} submitted={submitted} personaModal={personaModal}/>
            }               
            {/*MODAL PARA BORRAR ARTICULO INDIVIDUAL*/}
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i  className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {persona && <span style={{marginLeft: "20px"}}>¿Seguro que quieres borrar a <b>{persona.nombre} {persona.apellido}</b>?</span>}
                </div>
            </Dialog>
            {/* MODAL DE BORRAR CON SELECTOR MULTIPLE */}
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeletePersonasDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {personasSeleccionadas && <span style={{marginLeft: "20px"}}> ¿Seguro que queres borrar las personas seleccionadas?</span>}
                </div>
            </Dialog>
        </div>
    );
}      