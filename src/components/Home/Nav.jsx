import React, { useEffect, useRef } from 'react';
import shelve from '../../assets/shelve.jpg'
import { TabMenu } from 'primereact/tabmenu';
import { Menubar } from 'primereact/menubar';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { GET_CATEGORIAS, GET_PERSONA, GET_LIBROS } from '../../sagas/types'
import { Toast } from 'primereact/toast';

export default function Nav () {

	const dispatch = useDispatch()
	const history = useHistory();
	const state = useSelector(state => state.user)
	const toast = useRef(null);
	useEffect(() => {
		dispatch({type: GET_LIBROS})
		dispatch({type: GET_CATEGORIAS})
		dispatch({type: GET_PERSONA})		
	}, []);

	useEffect(() => {
		if(state.info != 0){
			toast.current.show({ severity: state.info.at(-1).severity, summary: state.info.at(-1).summary, detail: state.info.at(-1).detail, life: 3000	 });
		}
	}, [state.info]);

    const items = [
        {label: 'Biblioteca', icon: 'pi pi-fw pi-book', command:()=>{ history.push('/home')}},
        {label: 'Categorias', icon: 'pi pi-fw pi-bookmark', command:()=>{ history.push('/categoria')}},
        {label: 'Personas', icon: 'pi pi-fw pi-users', command:()=>{ history.push('/personas')}},
        {label: 'Settings', icon: 'pi pi-fw pi-cog', command:()=>{ history.push('/settings')}}
    ];

	return(
		<>	
			<div>
				<Toast ref={toast} />
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