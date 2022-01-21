import React, { useEffect, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { GET_CATEGORIAS, GET_PERSONA, GET_LIBROS, TOAST } from '../../sagas/types'
import { Toast } from 'primereact/toast';

export default function Nav () {

	const dispatch = useDispatch();
	const history = useHistory();
	const state = useSelector(state => state.user)
	const toast = useRef(null);

	useEffect(() =>{ 
		const init = () => {
		dispatch({type: GET_LIBROS})
		dispatch({type: GET_CATEGORIAS})
		dispatch({type: GET_PERSONA})	
		}

		init();
	}, [dispatch]);

	useEffect(() => {
		if(state.info != null){
			toast.current.show({ severity: state.info.severity, summary: state.info.summary, detail: state.info.detail, life: 3000	 });
		}
		dispatch({
			type:TOAST, 
			info: null
		}); 
	}, [state.info, dispatch]);

    const items = [
        {label: 'Biblioteca', icon: 'pi pi-fw pi-book', command:()=>{ history.push('/home')}},
        {label: 'Categorias', icon: 'pi pi-fw pi-bookmark', command:()=>{ history.push('/categoria')}},
        {label: 'Personas', icon: 'pi pi-fw pi-users', command:()=>{ history.push('/personas')}}
      //  {label: 'Settings', icon: 'pi pi-fw pi-cog', command:()=>{ history.push('/settings')}}
    ];

	return(
		<>	
			<div>
				<Toast ref={toast} />				
				<div id="menu">
					<Menubar model={items} />
            			</div>
				<div id="imagen"></div>
			</div>
		</>
	);

}