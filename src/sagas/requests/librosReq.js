import axios from 'axios'
import { URL } from './URL'

export const reqGetLibros = ( token ) => axios.get( URL + 'libro', { headers: { 'Authorization': token } } )
export const reqDeleteLibros = ( token, props ) => axios.delete( URL + 'libro/' + props, { headers: { 'Authorization': token } } )
export const reqPostLibros = ( token, props ) => axios( { method: 'post', url: URL + 'libro', data: props, headers: { 'Authorization': token } } )
export const reqPutLibros = ( token, props ) => axios( { method: 'put', url: URL + 'libro/' + props.id, data: props, headers: { 'Authorization': token } } )