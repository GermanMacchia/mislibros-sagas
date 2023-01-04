import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import generateStore from './configureStore'

import 'primereact/resources/themes/arya-purple/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './styles/index.css'
import './styles/login.css'
import './styles/media.css'


const store = generateStore()

const WithStore = () => <Provider store={ store } ><App /></Provider>
const WithStrictMode = () => <React.StrictMode><WithStore /></React.StrictMode>


ReactDOM.render( <WithStrictMode />, document.getElementById( 'root' ) )

