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

export default function Lista(){

//SE UBICA COMO INICIAL EN SETPRODUCTS QUE INGRESA DIALOG ABAJO
    let libroVacio= {
        id: null,
        autor: '',
        nombre: '',
        descripcion: '',
        categoria_id: null,
        persona_id: null,
        rating: 0,
    };

    const dispatch = useDispatch();
    const state = useSelector(state => state.libros)
    const categorias = useSelector(state => state.categoria.payload) 
    const personas = useSelector(state => state.persona.payload)

//INGRESO LISTA DE PRODUCTOS INICIAL
    const [libros, setLibros] = useState([]);   
//VISIBILIDAD DEL MODAL DE LIBROS NUEVOS / EDIT
    const [libroModal, setLibroModal] = useState(false);
    const [libroEditModal, setLibroEditModal] = useState(false);
//BORRAR PRODUCTO INDIVIDUAL
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
//BORRAR SELECCION MULTIPLE
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
//INGRESO A MODAL Y ELECCION INDIVIDUAL: VER LIBROVACIO
    const [libro, setLibro] = useState(libroVacio);
//SELECTORES POR CASILLA
    const [selectedProducts, setSelectedProducts] = useState(null);
//INGRESOS DEL MODAL
    const [submitted, setSubmitted] = useState(false);
    const [submitEdit, setSubmitEdit] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
//FILTRO DEL HEADER 
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

//INGRESO INICIAL DE PRODUCTOS A LISTA
    useEffect(() => {
        formatearArray()

    }, [personas, state, categorias]);

//FUNCION PARA FILTRAR ID CATEGORIAS Y PRESTADO/EN BIBIOTECA / (de la API llegan con numeros de id relacional)
function formatearArray(){
    if(state.payload && categorias){
            let auxCategorias = [...categorias]
            let libros = [...state.payload]
            let array = [];             
            //Por cada libro voy a crear un objeto distinto al que hay en el servidor para mejorar la presentación de la tabla
            libros.forEach( e => {
                //Saco el nombre de la categoria que coincida con el categoria_id de <<libros>> en cada caso
                let [ cate ] = auxCategorias.filter( c => c.id === e.categoria_id)
                //si el persona_id de <<libros>> esta ocupado quiere decir que esta prestado
                function retorno(){
                    if( e.persona_id !== null){
                        return "Prestado"
                    }else{
                        return "En biblioteca"
                    }
                }
                //Finalmente creo el objeto a medida con lo que consumo del servidor
                let objeto = {
                    id: e.id,
                    nombre: e.nombre,
                    categoria: cate.nombre,
                    descripcion: e.descripcion,
                    persona_id: e.persona_id,
                    categoria_id: e.categoria_id,
                    autor: e.autor,
                    rating: e.rating,
                    estado: retorno()
                }
                array.push(objeto)    
            }) 
            setLibros(array) 
    }        
}

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
       /* setCategoriaModal(libro.categoria_id)
        setNombrePlaceHolder(libro.nombre)
        if(libro.subtitulo){setSubtituloPlaceHolder(libro.subtitulo)}
        if(libro.descripcion){setDescripcionPlaceHolder(libro.descripcion)}
        if(libro.persona_id){setPrestado(libro.persona_id)}
        if(libro.rating){setStars(libro.rating)}
        setSubmitted(false);*/
        setSubmitEdit(false)
        setLibroEditModal(true);
        setLibro(libro)
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


//----------------------------------------BOTONERA IZQUIERDA SUPERIOR------------------------------------------------------------
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
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
        return (
            
            <React.Fragment>
                <Button icon="pi pi-info-circle" className="p-button-rounded p-button-warn p-mr-2" />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => confirmEditProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
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
        if( librosABorrar.length == 0){
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
        <div className="datatable-crud-demo">
            <div className="card">
                {/*BOTONERA SUPERIOR*/}
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
                {/*ESTRUCTURA DE TABLA*/}
                <DataTable                    
                    ref={dt} 
                    //VALORES DE LAS TABLAS
                    value={libros} 
                    //SELECCION POR CASILLA-
                    selectionMode="multiple" 
                    //HOOK, FUNCION y DATAKEY! REFERENCIA DENTRO DEL JSON
                    selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id"
                    paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} to {last} de {totalRecords} libros"
                    globalFilter={globalFilter}
                    header={header}>
                    {/*SELECCION POR CASILLA */}
                    {/* FIELD = AGARRA EL VALOR DEL OBJETO INGRESADO EN <Datatable> Value - REFERENCIA DEL JSON*/}
                    <Column selectionMode="multiple" headerStyle={{ width: '0.3rem' }}></Column>
                    <Column className="column" field="nombre" header="Nombre" sortable></Column>
                    <Column className="column" field="autor" header="Autor" sortable></Column>
                    <Column style={{wordWrap: "break-word", width: "5em"}} field="descripcion" header="Descripcion"></Column>
                    <Column className="column" field="categoria" header="Categoria" sortable></Column>
                    <Column style={{width: "3em"}}field="rating" header="Rating" body={ratingBodyTemplate} sortable></Column>
                    <Column className="column" field="estado" header="Estado" sortable></Column>
                    {/* OPCIONES BOORRAR Y EDIT n°175 */}
                    <Column className="column" body={actionBodyTemplate}></Column> 
                </DataTable>
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
        </div>
    );
}      