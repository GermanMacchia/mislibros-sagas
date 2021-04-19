import Router from './Router';
import axios from 'axios';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

export default function App() {
	
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

  return (
    <AlertProvider template={AlertTemplate} {...options}>
		  <Router />
	  </AlertProvider>
  );
}

 