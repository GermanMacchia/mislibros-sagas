import axios from 'axios';
import { URL } from './URL'

export const reqGetLibros = (token) => axios.get(URL + 'libro', { headers: {'Authorization': token} })