import axios from 'axios';
import { URL } from './URL'

export const requestLogin = (user) => axios.post(URL + "login", user)

