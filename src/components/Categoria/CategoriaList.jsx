import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../Spinner'
import CategoriaCard from './CategoriaCard'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { DELETE_CATEGORIAS } from '../../sagas/types'
import { Carousel } from 'primereact/carousel'

export default function CategoriaList () {

    const dispatch = useDispatch()
    const state = useSelector( state => state.categoria )
    const [ categorias, setCategorias ] = useState()
    const [ loaded, setLoaded ] = useState( false )
    const [ categoria, setCategoria ] = useState()
    const [ deleteCategoriaDialog, setDeleteCategoriaDialog ] = useState( false )

    const hideDeleteCategoriaDialog = () => {
        setDeleteCategoriaDialog( false )
    }

    const openDeleteModal = ( categoria ) => {
        setDeleteCategoriaDialog( true )
        setCategoria( categoria )
    }

    const deleteCategoria = () => {
        console.log( categoria )
        dispatch( {
            type: DELETE_CATEGORIAS,
            props: categoria.id
        } )
        hideDeleteCategoriaDialog()
    }

    useEffect( () => {
        if( state.loaded ) {
            setCategorias( state.payload )
            setLoaded( true )
        }
    }, [ state.loaded, state ] )

    const deleteCategoriaDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ () => hideDeleteCategoriaDialog() } />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ () => deleteCategoria() } />
        </React.Fragment>
    )

    const responsiveOptions = [
        {
            breakpoint: '200vw',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '400vw',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '600vw',
            numVisible: 1,
            numScroll: 1
        }
    ]

    const categoriaTemplate = ( categoria ) => {
        return ( <CategoriaCard key={ categoria.id } categoria={ categoria } openDelete={ openDeleteModal } /> )
    }

    return (
        <>
            {
                loaded ?
                    <div id="carrusel">
                        <Carousel value={ categorias } numVisible={ 1 } numScroll={ 1 } responsiveOptions={ responsiveOptions }
                            itemTemplate={ categoriaTemplate } />
                    </div>
                    :
                    <Spinner />
            }
            <Dialog visible={ deleteCategoriaDialog } style={ { width: '450px' } } header="Confirmar" modal footer={ deleteCategoriaDialogFooter } onHide={ hideDeleteCategoriaDialog }>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={ { fontSize: '2rem' } } />
                    { categoria && <span style={ { marginLeft: "20px" } }>¿Seguro que quieres borrar <b>{ categoria.nombre }</b>?</span> }
                </div>
            </Dialog>
        </>
    )
}


