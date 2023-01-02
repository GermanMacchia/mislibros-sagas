import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext'
import { DELETE_LIBROS} from '../../../sagas/types'
import ModalLibros from './ModalLibros';
import ModalEdit from './ModalEdit'
import Spinner from '../../utilities/Spinner';
import { useMediaQuery } from 'react-responsive'
import { useLibroList } from '../../../hooks/useLibroList';
import { MovileHeader } from './MovileHeader'
import { ColumnasLista, RatingBodyTemplate } from './ColumnasLista';

const libroVacio = {
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

export default function Lista() {

    const dispatch = useDispatch();
    const { libros, deleteSelectedProducts } = useLibroList();

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
    const isPC = useMediaQuery({ query: '(min-width: 500px)' });
    const [option, setOption] = useState(1);

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
        console.log(libro)
        dispatch({ type: DELETE_LIBROS, props: libro.id })
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
        const retornarLabelNuevo = () => {
            if (isPC) {
                return "Nuevo";
            }
        }
        const retornarLabelBorrar = () => {
            if (isPC) {
                return "Borrar";
            }
        }
        return (
            <React.Fragment>
                <Button label={retornarLabelNuevo()} icon="pi pi-plus" className="p-button-success p-mr-2 nuevobtn" onClick={openNew} />
                <Button label={retornarLabelBorrar()} icon="pi pi-trash" className="p-button-danger borrarbtn" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
                <InputText className="searchbtn" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </React.Fragment>
        )
    }

    //----------------------------------------------- INDICACIONES A LA FILA HORIZONTAL--------------------------------

    //OPCIONES DE CADA FILA {EDICION y BORRAR}
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info p-mr-2" onClick={() => mostrarInfo(rowData)} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => confirmEditProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    //FOOTER DE CONFIRMACION PARA BORRAR PRODUCTO INDIVIDUAL 
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteProductDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    //FOOTER DE CONFIRMACION PARA BORRAR PRODUCTOS MULTIPLES  
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteProductDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => deleteSelectedProducts(selectedProducts, setDeleteProductsDialog, setSelectedProducts)} />
        </React.Fragment>
    );

    //RENDER----------------------------------------------------------------------------------------------------------
    return (
        <div className="datatable-crud-demo" >
            <div className="card">
                {/*BOTONERA SUPERIOR*/}
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar>
                {/*ESTRUCTURA DE TABLA*/}
                {libros ?
                    <DataTable
                        ref={dt}
                        //VALORES DE LAS TABLAS
                        value={libros}
                        //SELECCION POR CASILLA- 
                        selectionMode="checkbox"
                        //HOOK, FUNCION y DATAKEY! REFERENCIA DENTRO DEL JSON
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator rows={3}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} to {last} de {totalRecords} libros"
                        globalFilter={globalFilter}
                        id="tablaB"
                        header={<MovileHeader isPC={isPC} setOption={setOption} option={option} />}
                    >
                        {/*SELECCION POR CASILLA */}
                        {/* FIELD = TOMA EL VALOR DEL OBJETO INGRESADO EN <Datatable> Value - REFERENCIA DEL JSON*/}
                        <Column selectionMode="multiple" headerStyle={{ width: '0.1rem' }}></Column>
                        <Column className="column nombre" field="nombre" header="Nombre" sortable></Column>
                        {/*CODICIONALES EN TAMAÑO MOVIL */}
                        {option === 1 && <Column className="column" field="autor" header="Autor/a" sortable></Column>}
                        {option === 2 && <Column className="column" field="categoria" header="Categoría" sortable></Column>}
                        {option === 3 && <Column className="column" field="rating" style={{ width: "28vw" }} header="Rating" body={RatingBodyTemplate} sortable></Column>}
                        {option === 4 && <Column className="column" field="estado" style={{ width: "28vw" }} header="Estado" sortable></Column>}
                        {/* Ver adaptable */}
                        {isPC && ColumnasLista()}
                        {/* OPCIONES BOORRAR Y EDIT n°175 */}
                        <Column className="column botones" body={actionBodyTemplate} ></Column>
                    </DataTable>
                    :
                    <Spinner />
                }
            </div>

            {/*MODAL LIBRO NUEVO*/}
            {libroEditModal ?
                <ModalEdit hideEditDialog={hideDialogEdit} submitEdit={submitEdit} libroEditModal={libroEditModal} libroUpdate={libro} />
                :
                <ModalLibros hideDialog={hideDialog} submitted={submitted} libroModal={libroModal} />
            }

            {/*MODAL PARA BORRAR ARTICULO INDIVIDUAL*/}
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={() => setDeleteProductDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {libro && <span style={{ marginLeft: "20px" }}>¿Seguro que quieres borrar <b>{libro.nombre}</b>?</span>}
                </div>
            </Dialog>

            {/* MODAL DE BORRAR CON SELECTOR MULTIPLE */}
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {libro && <span style={{ marginLeft: "20px" }}> ¿Seguro que queres borrar los libros seleccionados?</span>}
                </div>
            </Dialog>

            {/* MODAL INFO*/}
            <Dialog header={modalInfoData.nombre} visible={modalInfo} position="left" modal style={{ width: '80vw' }} draggable={true} resizable={false} onHide={hideModalInfo}>
                <p><b>Autor:</b><br /> {modalInfoData.autor}</p>
                <p><b>Categoria:</b><br /> {modalInfoData.categoria} </p>
                <p><b>Estado:</b><br /> {modalInfoData.estado}{modalInfoData.nombrePersona}</p>
                <p id="dialogo"><b>Sinopsis:</b><br /> {modalInfoData.descripcion}</p>
                <p><b>Valoración:</b></p>{RatingBodyTemplate(modalInfoData)}
            </Dialog>
        </div>
    );
}      