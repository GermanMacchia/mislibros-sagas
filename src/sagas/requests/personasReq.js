import axios from 'axios';
import { URL } from './URL'

export const reqGetPersonas = (token) => axios.get(URL + 'persona', { headers: {'Authorization': token} })
export const reqDeletePersonas = (token, props) => axios.delete(URL + 'persona/' + props, { headers: {'Authorization': token} })
export const reqPostPersonas = (token, props) => axios({method: 'post',url: URL + 'persona', data: props , headers: {'Authorization': token}})
export const reqPutPersona = (token, props) => axios({method: 'put',url: URL + 'persona/' + props.id, data: props , headers: {'Authorization': token}})