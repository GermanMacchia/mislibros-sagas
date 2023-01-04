import axios from 'axios'
import { URL } from './URL'

export const reqLogin = ( user ) => axios.post( URL + "login", user )
export const reqRegister = ( user ) => axios.post( URL + `registro`, user )
