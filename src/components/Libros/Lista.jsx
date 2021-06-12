import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DELETE_LIBROS } from '../../sagas/types';
import { Rating } from 'primereact/rating';


export default function Lista(){

//SE UBICA COMO INICIAL EN SETPRODUCTS QUE INGRESA DIALOG ABAJO
    let libroVacio= {
        id: null,
        subtitulo: '',
        nombre: '',
        descripcion: '',
        categoria_id: null,
        rating: 0,
    };

    const dispatch = useDispatch();
    const state = useSelector(state => state.libros)
    const categorias = useSelector(state => state.categoria.payload) 
    const personas = useSelector(state => state.persona.payload)
//INGRESO LISTA DE PRODUCTOS INICIAL
    const [libros, setLibros] = useState([]);   
//VISIBILIDAD DEL MODAL DE LIBROS NUEVOS / EDIT
    const [productDialog, setProductDialog] = useState(false);
//LISTA CATEGORIAS EN MODAL  
    const [auxCategorias, setAuxCategorias] = useState();    
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
//RATING MODAL
    const [value, setValue] = useState()
    const [prestado, setPrestado] = useState()
    const [categoriaModal, setCategoriaModal] = useState()
//FILTRO DEL HEADER 
    const [globalFilter, setGlobalFilter] = useState(null);

    const toast = useRef(null);
    const dt = useRef(null);

//INGRESO INICIAL DE PRODUCTOS A LISTA
    useEffect(() => {
        sacarCategoria()
        console.log(categorias)
    }, [state.loaded, categorias]);

//FUNCION PARA FILTRAR ID CATEGORIAS Y ASIGNARLAS AL ARRAY DE TABlA CON NOMBRE
function sacarCategoria(){

    if(state.payload && categorias){
                let AuxCategorias = [...categorias]
                let libros = [...state.payload]
                let array = [];             
                //Por cada libro voy a crear un objeto distinto al que hay en el servidor para mejorar la presentación de la tabla
                libros.forEach( e => {
                    //Saco el nombre de la categoria que coincida con el categoria_id de <<libros>> en cada caso
                    let [ cate ] = AuxCategorias.filter( c => c.id === e.categoria_id)
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
                        subtitulo: e.subtitulo,
                        rating: e.rating,
                        estado: retorno()
                    }
                    array.push(objeto)
                    
                }) 
                setLibros(array) 
    }        
}

//SWITCH PARA ABRIR EL DIALOGO LINEA 283
    const openNew = () => {
        setLibro(libroVacio);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }


    const saveProduct = () => {
        // setSubmitted(true);

        // if (product.name.trim()) {
        //     let _products = [...libros];
        //     let _product = {...product};
        //     if (product.id) {
        //         const index = findIndexById(product.id);

        //         _products[index] = _product;
        //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        //     }
        //     else {
        //         // _product.id = createId();
        //         _product.image = 'product-placeholder.svg';
        //         _products.push(_product);
        //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        //     }
        //     setLibros(_products);
        //     setProductDialog(false);
        //     setProduct(libroVacio);
        // }
    }

    const editProduct = (product) => {
        setLibro({...product});
        setProductDialog(true);
    }
    //MODAL CONFIRMACION
    const confirmDeleteProduct = (product) => {
        setLibro(product);
        setDeleteProductDialog(true);
    }

    //BORRAR PRODUCTO LINA 251
    const deleteProduct = () => {

        dispatch({type:DELETE_LIBROS, props: libro.id})
        setDeleteProductDialog(false);
        setLibro(libroVacio); 
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Libro Borrado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < libros.length; i++) {
            if (libros[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }


    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }


    // const onCategoryChange = (e) => {
    //     let _product = {...product};
    //     _product['category'] = e.value;
    //     setProduct(_product);
    // }

    // const onInputChange = (e, name) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _product = {...product};
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    // }

    // const onInputNumberChange = (e, name) => {
    //     const val = e.value || 0;
    //     let _product = {...product};
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    // }


//BOTONERA IZQUIERDA SUPERIOR------------------------------------------------------------
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

    //FOOTER DE MODAL +nuevo o editar(pencil)
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    //HEADER y BUSCADOR ----------------------------------------
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    //BORRAR PRODUCTO INDIVIDUAL LINEA 336
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    //BORRAR PRODUCTOS SELECCIONADOS ---------------------------------------

    // ESCONDER MODAL
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    // BORRAR PRODUCTOS SELECCIONADOS
    const deleteSelectedProducts = () => {
        let _products = libros.filter(val => !selectedProducts.includes(val));
        setLibros(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    //RENDER---------------------------------------------------------------------
    return (
        
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

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
                    <Column className="column" field="subtitulo" header="Subtitulo" sortable></Column>
                    <Column style={{wordWrap: "break-word", width: "5em"}} field="descripcion" header="Descripcion"></Column>
                    <Column className="column" field="categoria" header="Categoria" sortable></Column>
                    <Column style={{width: "3em"}}field="rating" header="Rating" body={ratingBodyTemplate} sortable></Column>
                    <Column className="column" field="estado" header="Estado" sortable></Column>
                    <Column className="column" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>


            {/* MODAL DE PRODUCTO NUEVO */}
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Ingrese el libro" footer={productDialogFooter} modal className="p-fluid" onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" autoFocus className={classNames({ 'p-invalid': submitted && !libro.nombre })} />
                    {submitted && !libro.nombre && <small className="p-error">Se requiere ingresar un nombre</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="name">Subtitulo</label>
                    <InputText id="name" autoFocus className={classNames({ 'p-invalid': submitted && !libro.name })} />
                </div>
                <div className="p-field">
                    <label htmlFor="description">Descripción</label>
                    <InputTextarea id="description" required rows={3} cols={20} />
                </div>
                <div className="p-field">
                    <label className="p-mb-3">Categoria</label>
                    <div className="p-formgrid p-grid">
                    <Dropdown optionLabel="nombre" options={categorias} value={categoriaModal} onChange={(e) => setCategoriaModal(e.value)} />
                    </div>
                </div>
                <div className="p-field">
                    <label className="p-mb-3">Prestado</label>
                    <div className="p-formgrid p-grid">
                    <Dropdown optionLabel="alias" options={personas} value={prestado} onChange={(e) => setPrestado(e.value)} />
                    </div>
                </div>
                <div className="p-field">
                    <label className="p-mb-3">Rating</label>
                    <div style={{marginTop:"10px"}} className="p-formgrid p-grid">
                    <Rating cancel={false} value={value} onChange={(e) => setValue(e.value)} />
                    </div>
                </div>
            </Dialog>

        {/*MODALES*/}
            {/*MODAL PARA BORRAR ARTICULO INDIVIDUAL*/}
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {libro && <span>¿Seguro que quieres borrar <b>{libro.nombre}</b>?</span>}
                </div>
            </Dialog>
            {/* MODAL DE BORRAR CON SELECTOR MULTIPLE */}
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {libro && <span> ¿Seguro que queres borrar los libros seleccionados?</span>}
                </div>
            </Dialog>
        </div>
    );
}      