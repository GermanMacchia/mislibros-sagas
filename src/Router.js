import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import SignIn from './components/Login/SignIn';
import Home from './components/Home/Home';
import Categorias from './components/Categoria/Categorias';
import Personas from './components/Persona/Personas';
import Settings from './components/utilities/Settings'
import { useSelector } from 'react-redux'

export default function Router (){

	const isLogged = useSelector(state => state.user.loggedIn)

	return(
		<BrowserRouter>
				
				<Switch>					
					<Route exact path="/" component= {SignIn} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/categoria" component={Categorias} />
					<Route exact path="/personas" component={Personas} />
					<Route exact path="/settings" component={Settings} />
					<Route component={Error} />
				</Switch>
		</BrowserRouter>
	);	
}

