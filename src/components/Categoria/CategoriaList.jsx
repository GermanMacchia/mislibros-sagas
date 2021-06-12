import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
// import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import ClassIcon from '@material-ui/icons/Class';
// import FormatList from '@material-ui/icons/FormatListNumbered';
import { OrderList } from 'primereact/orderlist';
import { Dialog } from 'primereact/dialog';
import '../../styles/orderList.css';
// import AutorenewIcon from '@material-ui/icons/Autorenew';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function CategoriaList () {

    const state = useSelector( state => state.categoria )
    // const [categoriasHtml, setCategoriasHtml] = useState();
    const [categorias, setCategorias] = useState();

    useEffect(() => {
        setCategorias(state.payload)
    }, [state.loaded])

    console.log(categorias)

    // useEffect(() => {

    //     // if (categorias !== undefined) {

    //     //     const categoriaAux = categorias.map((categoria, index) => (
    //     //         <tr key={index}>
	//     //         	<td id="indexcategoria"><p><strong>{index + 1}</strong></p></td> 
	//     //             <td id="nombrecategoria"><p>{categoria.nombre}</p></td>
	//     //         	<td id="aliascategoria"><p>{categoria.id}</p></td>
    //     //             <td id="mostrarLibrosBtt"><button className="funcionBtt" value= {categoria.id}>V</button></td>
	//     //         	<td id="deleteBtt"><button className="funcionBtt" value= {categoria.id}>X</button></td>
    //     //             <td id="editadoBtt"><button className="funcionBtt" value= {categoria.id}>E</button></td>
	//     //         </tr>
    //     //     ))

    //     //     setCategoriasHtml(categoriaAux);
    //     // }

    // }, [categorias])

    // const [products, setProducts] = useState([]);
    // const productService = new ProductService();

    // useEffect(() => {
    //     productService.getProductsSmall().then(data => setProducts(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (item) => {
        return (
            <div className="product-item">
                <div className="image-container">
                    <img src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Feltinteroeditorial.com%2Fbases-para-historias-de-terror&psig=AOvVaw2s4seonGS7tBZv32Qn-uL1&ust=1623380286590000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjYs4GJjPECFQAAAAAdAAAAABAO"} 
                    onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.nombre} />
                </div>
                <div className="product-list-detail">
                    <h5 className="p-mb-2">{item.nombre}</h5>
                    
                </div>
                <div className="product-list-action">
                    <span className="product-category">{item.id}</span>
                    {/* <h6 className="p-mb-2">${item.id}</h6>
                    <span className={`product-badge status-${item.inventoryStatus.toLowerCase()}`}>{item.inventoryStatus}</span> */}
                </div> 
            </div>
        );
    }

    return (
        <>
            <div className="orderlist-demo">
                <div className="card">
                    <OrderList value={categorias} header="Categorias" dragdrop listStyle={{height:'auto'}} dataKey="id"
                        itemTemplate={itemTemplate} onChange={(e) => setCategorias(e.value)}></OrderList>
                </div>
            </div>
        </>
    );
}

//     return (
//         <div>
// 			<h2>Lista de categorias</h2>
//             {/* <Tooltip title= "Reset ID +">
//                 <button style={{alignText: "left"}}className="reset" >
//                     <AutorenewIcon />
//                 </button>
//             </Tooltip> */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>
//                             <Tooltip title= "Numero">
//                                 <FormatList />
//                             </Tooltip>
//                         </th>
//                         <th>Nombre</th>
//                         <th>
//                             <Tooltip title= "Categoria ID">
//                                 <ClassIcon />
//                             </Tooltip>                          
//                         </th>
//                         <th className="funcion">
//                         <Tooltip title= "Ver Libros">
//                                 <ListAltIcon />
//                             </Tooltip>
//                         </th>  
//                         <th className="funcion">
//                             <Tooltip title= "Borrar">
//                                 <DeleteIcon />
//                             </Tooltip>
//                         </th>
//                         <th className="funcion">
//                             <Tooltip title= "Editar">
//                                 <EditIcon />
//                             </Tooltip>
//                         </th>  
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {categoriasHtml}
//                 </tbody>
//             </table>
// 		</div>
//     );
// }


