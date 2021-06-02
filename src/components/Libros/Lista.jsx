import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useSelector } from 'react-redux';
import { DELETE_LIBROS } from '../../sagas/types';


export default function Lista(){

//SE UBICA COMO INICIAL EN SETPRODUCTS QUE INGRESA DIALOG ABAJO
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const dispatch = useDispatch();
    const state = useSelector(state => state.libros)
    const [auxCategorias, setAuxCategorias] = useState()
    const categorias = useSelector(state => state.categoria.payload)    
    const personas = useSelector(state => state.persona.payload)   

//INGRESO LISTA DE PRODUCTOS INICIAL
    const [products, setProducts] = useState(null);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

//INGRESO SET DIALOG LINEA 283
    const [product, setProduct] = useState(emptyProduct);
//SELECTORES POR CASILLA
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [submitted, setSubmitted] = useState(false);

//FILTRO DEL HEADER 
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

//INGRESO INICIAL DE PRODUCTOS A LISTA
    useEffect(() => {
        sacarCategoria()
    }, [state.loaded, categorias]);

//FUNCION PARA FILTRAR ID CATEGORIAS Y ASIGNARLAS AL ARRAY DE TABlA CON NOMBRE
function sacarCategoria(){

    if(state.payload !== 0 && categorias !== undefined){
                let cat = [...categorias]
                let tabla = [...state.payload]
                let array1 = [];
                
                tabla.forEach( e => {
                    
                    let [ cate ] = cat.filter( c => c.id === e.categoria_id)
                    

                    function retorno(){
                        if( e.persona_id !== null){
                            return "Prestado"
                        }else{
                            return "En biblioteca"
                        }
                    }
                    
                    let objeto = {
                        nombre: e.nombre,
                        categoria: cate.nombre,
                        descripcion: e.descripcion,
                        subtitulo: e.subtitulo,
                        estado: retorno()
                    }
                    array1.push(objeto)
                }) 
                setProducts(array1) 
            }        

}


//SWITCH PARA ABRIR EL DIALOGO LINEA 283
    const openNew = () => {
        setProduct(emptyProduct);
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

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = {...product};
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                // _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }
            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    }
//MODAL CONFIRMACION
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    //BORRAR PRODUCTO LINA 251
    const deleteProduct = () => {

        dispatch({type:DELETE_LIBROS, props: product.id})
        setDeleteProductDialog(false);
        setProduct(emptyProduct); 
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Libro Borrado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    
//CREAR ID AL LLEGAR LOS PRODUCTOS
    // const createId = () => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

//EXPORT A CRUD ?----
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
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
//BOTONERA IZQUIERDA SUPERIOR
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

    //IMAGEN
    const imageBodyTemplate = (rowData) => {
        return <img src={`showcase/demo/images/product/${rowData.image}`} onError={(e) => e.target.src='https://www.psicoactiva.com/wp-content/uploads/puzzleclopedia/Libros-codificados-300x262.jpg'} alt={rowData.image} className="product-image" />
    }

    // const priceBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.price);
    // }

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // }

    // const statusBodyTemplate = (rowData) => {
    //     return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    // }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    //HEADER y BUSCADOR
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">TU BIBLIOTECA</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>  
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    //BORRAR PRODUCTO INDIVIDUAL LINEA 336
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
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
                    // ref={dt} 
                    //VALORES DE LAS TABLAS
                    value={products} 
                    //SELECCION POR CASILLA
                    selection={selectedProducts} 
                    onSelectionChange={ e => setSelectedProducts(e.value)}
                    dataKey="id" 
                    paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} to {last} de {totalRecords} libros"
                    globalFilter={globalFilter}
                    header={header}>

                    {/*SELECCION POR CASILLA */}
                    <Column selectionMode="multiple" headerStyle={{ width: '0.3rem' }}></Column>
                    {/* <<FIELD>> AGARRA EL VALOR DEL OBJETO INGRESADO EN <Datatable> Value */}
                    <Column className="column" field="nombre" header="Nombre" sortable></Column>
                    <Column className="column" field="subtitulo" header="Subtitulo" sortable></Column>
                    {/* Esta anulado */}
                    <Column style={{display: "none"}} header="Imagen" body={imageBodyTemplate}></Column>
                    {/* tiene una ampliacion mayor */}
                    <Column style={{wordWrap: "break-word", width: "100px"}} field="descripcion" header="Descripcion"></Column>
                    <Column className="column" field="categoria" header="Categoria" sortable></Column>
                    {/* <Column field="rating" header="Rating" body={ratingBodyTemplate} sortable></Column> */}
                    <Column className="column" field="estado" header="Estado" sortable></Column>
                    <Column className="column" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>


            {/* MODAL DE PRODUCTO NUEVO */}
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Ingrese el libro" footer={productDialogFooter} modal className="p-fluid" onHide={hideDialog}>
                {/* {product.image && <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image" />} */}
                <div className="p-field">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" value={product.name}  required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Se requiere ingresar un nombre</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="name">Subtitulo</label>
                    <InputText id="name" value={product.subtitulo} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="description">Descripción</label>
                    <InputTextarea id="description" value={product.description} required rows={3} cols={20} />
                </div>

                <div className="p-field">
                    <label className="p-mb-3">Categoria</label>
                    <div className="p-formgrid p-grid">
                    <Dropdown value={product.categoria_id} options={auxCategorias}  optionLabel="Categoria" editable />
                    </div>
                </div>

                <div className="p-field">
                    <label className="p-mb-3">Prestado</label>
                    <div className="p-formgrid p-grid">
                    <Dropdown value={product.category} options={auxCategorias}  optionLabel="Categoria" editable />
                    </div>
                </div>
            </Dialog>

        {/*MODALES*/}
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>¿Seguro que quieres borrar <b>{product.nombre}</b>?</span>}
                </div>
            </Dialog>
            {/* MODAL DE BORRAR CON SELECTORES */}
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span> ¿Seguro que queres borrar los libros seleccionados?</span>}
                </div>
            </Dialog>
        </div>
    );
}
                 