import axios from 'axios';
import { URL } from './URL'

export const reqGetCategorias = (token) => axios.get(URL + `categoria`, { headers: {'Authorization': token} })