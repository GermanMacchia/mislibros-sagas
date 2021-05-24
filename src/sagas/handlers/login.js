import { call, put, take } from 'redux-saga/effects'
import delay from 'redux-saga';
import { requestLogin } from '../request/login'
import { LOGIN, setLoginSuccess } from '../userDuck'

//llama al request y guarda en el strore

export function* handleGetLogin() {

    try{
        delay(1000)
        const auth = yield take(LOGIN);
        const user = auth.payload; 
        const response = yield call(requestLogin, user)
        const { data } = response.token
        console.log(response.token)
        yield put(setLoginSuccess(data))
    } catch (error){
        console.log(error)
        console.log("Salto error")
    }

}