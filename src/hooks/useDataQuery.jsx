import { useSelector } from 'react-redux'

export const useDataQuery = () => {
    const categorias = useSelector( state => state.categoria.payload )
    const libros = useSelector( state => state.libros )
    const personas = useSelector( state => state.persona.payload )

    return {
        categorias,
        libros,
        personas
    }
}
