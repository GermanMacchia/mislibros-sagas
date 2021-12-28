import axios from 'axios';
import { URL } from './URL'

export const reqLogin = (user) => axios.post(URL + "login", user)
