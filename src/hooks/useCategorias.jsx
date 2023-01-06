import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { POST_CATEGORIAS } from '../sagas/types'

const categoriaForm = { nombre: '', imagen: '', descripcion: '' }
export const useCategorias = () => {

  const [ form, setForm ] = useState( categoriaForm )
  const dispatch = useDispatch()

  const handleForm = ( e ) => {
    setForm( {
      ...form,
      [ e.target.name ]: e.target.value
    } )
  }

  const handleSubmit = () => {
    dispatch( {
      type: POST_CATEGORIAS,
      props: form
    } )
    document.getElementById( 'categoriaForm' ).reset()
  }

  return {
    handleSubmit,
    handleForm
  }
}
