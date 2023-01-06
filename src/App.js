import Router from './Router'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { useSession } from './hooks'
import { Toast } from './components/Toast'

export default function App () {

  const { info } = useSession()

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }

  return (
    <AlertProvider template={ AlertTemplate } { ...options }>
      <Toast info={ info } />
      <Router />
    </AlertProvider>
  )
}

