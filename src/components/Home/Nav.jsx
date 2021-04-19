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
			<nav id="nav">
				<ul >
				<div className="buttonsNav">
					<li>
						<Link to ={"/home"}>
							<Button
								className="butNav"
						        variant="contained"
						        color="primary"
						        startIcon={<LocalLibraryIcon />}>
						        Biblioteca
						    </Button>
						</Link>
				    </li>
					<li>
						<Link to ={"/categoria"}>
							<Button
								className="butNav"
						        variant="contained"
						        color="primary"
						        startIcon={<CategoryIcon />}>
						        Categoria
						    </Button>
						</Link>
					</li>
					</div>
					<div className="buttonsNav">
					<li>
						<Link to ={"/personas"}>
							<Button
								className="butNav"
						        variant="contained"
						        color="primary"
						        startIcon={<PersonPinIcon />}>
						        Personas
						    </Button>
						</Link>
					</li>
					<li >
						<a id="salir" href= "//localhost:3000/">
							<Button
								className="butNav"
						        variant="contained"
						        color="default"
						        startIcon={<ExitToAppIcon />}>
						        Salir
						    </Button>
						</a>
					</li>
				</div>
				</ul>
			</nav> 
		</>
	);

}