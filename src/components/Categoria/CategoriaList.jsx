import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import Spinner from '../utilities/Spinner'
import CategoriaCard from './CategoriaCard';

export default function CategoriaList () {

    const state = useSelector( state => state.categoria )
    const [categorias, setCategorias] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setCategorias(state.payload)
        setLoaded(true)
    }, [state.loaded])


    const cartas = (nombre, id) => {
        
        return  <CategoriaCard nombre={nombre} descripcion={id} />

    }

    const itemTemplate = (item) => {
        return (             
            
            <div className="product-item">

                <div className="image-container">
                    <img src={"http://4.bp.blogspot.com/-96B1ZlftYbQ/UhDNBNV9vAI/AAAAAAAANKM/DXP-KnOrwtM/s640/masks.jpg"} 
                    onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.nombre} />
                </div>
                <div className="product-list-detail">
                    <h5 className="p-mb-2">{item.nombre}</h5>    
                </div>
                <div className="product-list-action">
                    <span className="product-category">{item.id}</span>
                </div> 
            </div>
        );
    }

    return (
        <div class= 'block'>
            { 
                loaded ? categorias.map((cat) => { return (<CategoriaCard key={cat.id} imagen={cat.imagen} nombre={cat.nombre} descripcion={cat.descripcion}/>) }) 
                    :
                <Spinner /> 
            }
        </div>
    );
}


