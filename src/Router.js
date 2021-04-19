import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Home/Header';
import SignIn from './components/Login/SignIn';
import Home from './components/Home/Home';
import Categorias from './components/Categoria/Categorias';
import Personas from './components/Persona/Personas';


export default function Router (props){

	return(

		<BrowserRouter> 

			<Header />
				
				<Switch>
					<Route exact path="/" component={SignIn} />
					<Route exact path="/home" component={Home} />
					
					<Route exact path="/categoria" component={Categorias} />
					<Route exact path="/personas" component={Personas} />
					<Route component={Error} />
				</Switch>
		
		</BrowserRouter>
	);	
}

