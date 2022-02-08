import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'
import { DELETE_LIBROS, TOAST } from '../../sagas/types';
import { Rating } from 'primereact/rating';
import ModalLibros from './ModalLibros';
import ModalEdit from './ModalEdit';
import Spinner from '../utilities/Spinner';
import { useMediaQuery } from 'react-responsive'
import { SplitButton } from 'primereact/splitbutton';

export default function Lista(){

//SE UBICA COMO INICIAL EN SETPRODUCTS QUE INGRESA DIALOG ABAJO
    let libroVacio= {
        id: null,
        autor: '',
        nombre: '',
        categora: '',
        nombrePersona: '',
        descripcion: '',
        categoria_id: null,
        persona_id: null,
        rating: 0,
        estado: ''
    };

    const dispatch = useDispatch();
    const state = useSelector(state => state.libros)
    const categorias = useSelector(state => state.categoria.payload) 
    const personas = useSelector(state => state.persona.payload)
    const toast = useRef(null);
//INGRESO LISTA DE PRODUCTOS INICIAL
    const [libros, setLibros] = useState([]);   
//VISIBILIDAD DEL MODAL DE LIBROS NUEVOS / EDIT
    const [libroModal, setLibroModal] = useState(false);
//MODAL INFO
    const [libroEditModal, setLibroEditModal] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);
//BORRAR PRODUCTO INDIVIDUAL
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
//BORRAR SELECCION MULTIPLE
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
//INGRESO A MODAL Y ELECCION INDIVIDUAL: VER LIBROVACIO
    const [libro, setLibro] = useState(libroVacio);
    const [modalInfoData, setModalInfoData] = useState(libroVacio);
//SELECTORES POR CASILLA
    const [selectedProducts, setSelectedProducts] = useState(null);
//INGRESOS DEL MODAL
    const [submitted, setSubmitted] = useState(false);
    const [submitEdit, setSubmitEdit] = useState(false);
//FILTRO DEL HEADER 
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
//MEDIA QUERY
    const isPC = useMediaQuery({ query: '(min-width: 500px)'});

//INGRESO INICIAL DE PRODUCTOS A LISTA
    useEffect(() => {

        function retornarNombreCat(categoria_id){
            let [categoriaAux] = categorias.filter( c => c.id === categoria_id)
            return categoriaAux.nombre
        }    

        function retornarNombrePersona(persona_id){
            let persona = ''
            if( persona_id !== null){
                let [personaAux] = personas.filter( c => c.id === persona_id)
                persona = ' a '+ personaAux.nombre + ' ' + personaAux.apellido
            }
            return persona
        }   

        function retornarEstadoLibro(persona_id){
            let estado;
            if( persona_id !== null){
                estado = "Prestado"
            }else{
                estado = "Disponible"
            }
            return estado
        }

        //FUNCION PARA FILTRAR ID CATEGORIAS Y PRESTADO/EN BIBIOTECA / (de la API llegan con numeros de id relacional)
        function formatearArray(){
            if(state.payload && categorias && personas){

                    let libros = [...state.payload]
                    let array = [];             
                    //Por cada libro voy a crear un objeto distinto al que hay en el servidor para mejorar la presentación de la tabla
                    libros.forEach( e => {
                        let objeto = {
                            id: e.id,
                            nombre: e.nombre,
                            categoria: retornarNombreCat(e.categoria_id),
                            nombrePersona: retornarNombrePersona(e.persona_id),
                            descripcion: e.descripcion,
                            persona_id: e.persona_id,
                            categoria_id: e.categoria_id,
                            autor: e.autor,
                            rating: e.rating,
                            estado: retornarEstadoLibro(e.persona_id)
                        }
                        array.push(objeto)    
                    }) 
                    setLibros(array) 
            }        
        }
        formatearArray()
    
    }, [personas, state, categorias]);



//ABRIR EL MODAL DE INGRESO NUEVO
    const openNew = () => {
        //setLibro(libroVacio);
        setSubmitted(false);
        setLibroModal(true);
    }
//CERRAR MODAL SIN GUARDAR
    const hideDialog = () => {
        //setSubmitted(false);
        setLibroModal(false);
    }
    
    const hideDialogEdit = () => {
        setLibroEditModal(false)
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }


    const confirmEditProduct = (libro) => {
        setSubmitEdit(false)
        setLibroEditModal(true);
        setLibro(libro)
    }

    const mostrarInfo = (rowData) => {
        setModalInfo(true)
        setModalInfoData(rowData)
    }
    
    //MODAL CONFIRMACION BORRAR INDIVIDUAL
    const confirmDeleteProduct = (libroFila) => {
        setLibro(libroFila);
        setDeleteProductDialog(true);
    }
    //BORRAR PRODUCTO INDIVIDUAL UNA VEZ CONFIRMADO
    const deleteProduct = () => {
        dispatch({type:DELETE_LIBROS, props: libro.id})
        setDeleteProductDialog(false);
        setLibro(libroVacio); 
    }
    //MODAL CONFIRMACION BORRAR MULTIPLES
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }
    // ESCONDER MODAL DE COMFIRMACIÓN
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    
    const hideModalInfo = () => {
        setModalInfo(false)
    }


//----------------------------------------BOTONERA IZQUIERDA SUPERIOR------------------------------------------------------------
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

//----------------------------------------RETORNAR COLUMNAS DINAMICAS MEDIA QUERY DATATABLE------------------------------------------------------------  
    const returnColumns = () => {
        const columns = [
        {field: 'descripcion', header: 'Sinopsis'},
        {field: 'categoria', header: 'Categoria'},
        {field: 'rating', header: 'Valoracion'},
        {field: 'estado', header: 'Estado'}
    ];
        return columns.map((col, _i) => {
            if(col.field === 'rating'){
                return <Column className="column" key={col.field} field={col.field} header={col.header}  body={ratingBodyTemplate} sorteable />;
            }else if(col.field === 'descripcion'){
                return <Column style={{wordWrap: "break-word", width: "5em"}} key={col.field} field={col.field} header={col.header}  sorteable />;
            }else{
                return <Column className="column" key={col.field} field={col.field} header={col.header}  sorteable />;
            }
        });
    }


//--------------------------------------------------HEADER y BUSCADOR ----------------------------------------
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">TU BIBLIOTECA</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>  
        </div>
    );
    

//----------------------------------------------- INDICACIONES A LA FILA HORIZONTAL--------------------------------

    //TEMPLATE DE ESTRELLAS RATING
    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    //OPCIONES DE CADA FILA {EDICION y BORRAR}
    const actionBodyTemplate = (rowData) => {
    
    const items = [
        {
            icon: 'pi pi-pencil',
            command: () => confirmEditProduct(rowData)
        },
        {
            icon: 'pi pi-trash',
            command: () => confirmDeleteProduct(rowData)
        }
    ]
        return (
            isPC?
            <React.Fragment>
                <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info p-mr-2" onClick={() => mostrarInfo(rowData)}/>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => confirmEditProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
                :
            <>
                <div>
                    <SplitButton style={{width: '5.5rem', position: 'relative'}} dropdownIcon="pi pi-plus" menuClassName="dropmenu" icon="pi pi-info-circle" model={items} onClick={() => mostrarInfo(rowData)} className="p-button-info mr-2"></SplitButton>
                </div>
            </>

        );
    }

    //FOOTER DE CONFIRMACION PARA BORRAR PRODUCTO INDIVIDUAL 
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );


    //BORRAR PRODUCTOS DE SELECCION MULTIPLE 
    const deleteSelectedProducts = () => {

        //Los libros a Borrar debe ser los que NO están prestados
        var librosABorrar = []
        librosABorrar = selectedProducts.filter( libro => libro.persona_id == null)

        //función para que retorne array solo los nombres de otro array
        const retornarLista = (aBorrar) =>{
            var nombres = []
            nombres = aBorrar.map(element => {
                return element.nombre
            });
            return nombres
        }

        //Condiciones para TOAST de info
        if( librosABorrar.length === 0){
            //NINGUNO
            dispatch({
                type:TOAST, 
                info: {
                    severity: 'info', 
                    summary: 'Atención', 
                    detail: 'Los libros prestados no pueden eliminarse'
                }
            })

        }else if(selectedProducts.length > librosABorrar.length){
            //ALGUNOS
            dispatch({
                type:TOAST, 
                info: { 
                    severity: 'warn', 
                    summary: 'Prestados no pueden eliminarse', 
                    detail: retornarLista(librosABorrar).toString() + ' se han eliminado'
                }
            })    

        } else{
            //TODOS
            dispatch({
                type:TOAST, 
                info: { 
                    severity: 'success', 
                    summary: 'Libros Eliminados', 
                    detail: retornarLista(librosABorrar).toString() 
                }
            }) 
        }
        
        librosABorrar.forEach( e =>{
            dispatch({type:DELETE_LIBROS, props: e.id})
        })

        setDeleteProductsDialog(false);
        setSelectedProducts(null);
    }

    //FOOTER DE CONFIRMACION PARA BORRAR PRODUCTOS MULTIPLES  
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    //RENDER----------------------------------------------------------------------------------------------------------
    return (
        <div className="datatable-crud-demo" >
            <div className="card">
                {/*BOTONERA SUPERIOR*/}
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
                {/*ESTRUCTURA DE TABLA*/}
                { state.loaded ?
                    <DataTable       
                        ref={dt} 
                        //VALORES DE LAS TABLAS
                        value={libros} 
                        //SELECCION POR CASILLA-
                        selectionMode="checkbox"  
                        //HOOK, FUNCION y DATAKEY! REFERENCIA DENTRO DEL JSON
                        selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id"
                        paginator rows={3} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} to {last} de {totalRecords} libros"
                        globalFilter={globalFilter}
                        id="tablaB"
                        >
                        {/*SELECCION POR CASILLA */}
                        {/* FIELD = AGARRA EL VALOR DEL OBJETO INGRESADO EN <Datatable> Value - REFERENCIA DEL JSON*/}
                        <Column selectionMode="multiple" headerStyle={{ width: '0.3rem' }}></Column>
                        <Column className="column nombre" field="nombre" header="Nombre" sortable></Column>
                        <Column className="column autor" field="autor" header="Autor" sortable></Column>   
                        {/* Ver adaptable */}                      
                        {isPC && returnColumns()}
                        {/* OPCIONES BOORRAR Y EDIT n°175 */} 
                        <Column className="column botones" body={actionBodyTemplate}></Column>
                    </DataTable>                            
                        :
                    <Spinner />
                }
            </div>    

            {/*MODAL LIBRO NUEVO*/}  
            {libroEditModal?                
                <ModalEdit hideEditDialog={hideDialogEdit} submitEdit={submitEdit} libroEditModal={libroEditModal} libroUpdate={libro}/>
                :
                <ModalLibros hideDialog={hideDialog} submitted={submitted} libroModal={libroModal}/>
            }               
            {/*MODAL PARA BORRAR ARTICULO INDIVIDUAL*/}
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i  className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {libro && <span style={{marginLeft: "20px"}}>¿Seguro que quieres borrar <b>{libro.nombre}</b>?</span>}
                </div>
            </Dialog>
            {/* MODAL DE BORRAR CON SELECTOR MULTIPLE */}
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {libro && <span style={{marginLeft: "20px"}}> ¿Seguro que queres borrar los libros seleccionados?</span>}
                </div>
            </Dialog>
            {/* MODAL INFO*/}
                <Dialog header={modalInfoData.nombre} visible={modalInfo} position="left" modal style={{ width: '50vw' }} draggable={false} resizable={false} onHide={hideModalInfo}>
                    <p><b>Autor:</b> {modalInfoData.autor}</p>
                    <p><b>Categoria:</b> {modalInfoData.categoria} </p>
                    <p><b>Estado:</b> {modalInfoData.estado}{modalInfoData.nombrePersona}</p>
                    <p id="dialogo"><b>Sinopsis</b>:<br /> {modalInfoData.descripcion}</p>                
                    <p><b>Valoración:</b></p>{ratingBodyTemplate(modalInfoData)}
                </Dialog>
        </div>
    );
}      