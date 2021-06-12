import React, { useEffect, useState } from 'react';
import shelve from '../../assets/shelve.jpg'
// import { Link } from "react-router-dom";
import { TabMenu } from 'primereact/tabmenu';
import { Menubar } from 'primereact/menubar';
// import Button from '@material-ui/core/Button';
// import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
// import CategoryIcon from '@material-ui/icons/Category';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { GET_CATEGORIAS, GET_PERSONA, GET_LIBROS } from '../../sagas/types'

export default function Nav () {

	const dispatch = useDispatch()
	const history = useHistory();

	useEffect(() => {
		dispatch( { type: GET_LIBROS } )
		dispatch({type: GET_CATEGORIAS})
		dispatch({type: GET_PERSONA})		
	}, []);

    const items = [
        {label: 'Biblioteca', icon: 'pi pi-fw pi-book', command:()=>{ history.push('/home')}},
        {label: 'Categorias', icon: 'pi pi-fw pi-bookmark', command:()=>{ history.push('/categoria')}},
        {label: 'Personas', icon: 'pi pi-fw pi-users', command:()=>{ history.push('/personas')}},
        {label: 'Settings', icon: 'pi pi-fw pi-cog', command:()=>{ history.push('/settings')}}
    ];

	return(
		<>	
			<div>
				<img id= "imagen" src= {shelve} alt="shelve" />
				<div id="menu">
					{/* <TabMenu model={items} activeIndex={activeIndex} /> */}
					<Menubar model={items} />
            			</div>
				{/* <div className="buttonsNav">			
					<Link className="butNavSalir" to={"/"} >
						<Button						
							variant="contained"
							color="default"
							startIcon={<ExitToAppIcon />}>
							Salir
						</Button>
					</Link>
					<Link className="butNav" to ={"/home"}>
						<Button 
							variant="contained"
							color="primary"
							startIcon={<LocalLibraryIcon />}>
							Biblioteca
						</Button>
					</Link>
				</div>
				<div className= "buttonsNav">
					<Link className="butNav" to ={"/categoria"}>
						<Button						
							variant="contained"
							color="primary"
							startIcon={<CategoryIcon />}>
							Categoria
						</Button>
					</Link>
					<Link className="butNavPer" to ={"/personas"}>
						<Button						
							variant="contained"
							color="primary"
							startIcon={<PersonPinIcon />}>
							Personas
						</Button>
					</Link>
				</div> */}
			</div>
		</>
	);

}