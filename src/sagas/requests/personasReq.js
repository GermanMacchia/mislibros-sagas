import axios from 'axios';
import { URL } from './URL'

export const reqGetPersonas = (token) => axios.get(URL + 'persona', { headers: {'Authorization': token} })