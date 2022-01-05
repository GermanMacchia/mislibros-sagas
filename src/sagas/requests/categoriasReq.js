import axios from 'axios';
import { URL } from './URL'

export const reqGetCategorias = (token) => axios.get(URL + `categoria`, { headers: {'Authorization': token} })
export const reqPostCategorias = (token, props) => axios({method: 'post',url: URL + 'categoria', data: props, headers: {'Authorization': token}})
export const reqDeleteCategorias = (token, props) => axios.delete(URL + 'categoria/' + props, { headers: {'Authorization': token} })