import React from 'react';
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import CategoryIcon from '@material-ui/icons/Category';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { green, purple } from '@material-ui/core/colors';


export default function Nav () {


	return(
		<>
			<div className="buttonsNav">
				<Link className="butNav" to ={"/home"}>
					<Button 
						
						variant="contained"
						color="primary"
						startIcon={<LocalLibraryIcon />}>
						Biblioteca
					</Button>
				</Link>
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
				<Link className="butNavSalir" to={"/"} >
					<Button						
						variant="contained"
						color="default"
						startIcon={<ExitToAppIcon />}>
						Salir
					</Button>
				</Link>
			</div>
		</>
	);

}