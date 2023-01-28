import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignIn from './components/Login/SignIn'
import Home from './components/Home/Home'
import Categorias from './components/Categoria/Categorias'
import Personas from './components/Persona/Personas'

export default function Router () {

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={ SignIn } />
				<Route exact path="/home" component={ Home } />
				<Route exact path="/categoria" component={ Categorias } />
				<Route exact path="/personas" component={ Personas } />
				<Route path="/*" component={Home} />
				<Route component={ Error } />
			</Switch>
		</BrowserRouter>
	)
}

