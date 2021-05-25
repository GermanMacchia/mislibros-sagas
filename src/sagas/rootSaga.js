import { takeLatest, all } from 'redux-saga/effects';
import { handleGetLogin } from './handlers/loginHand';
import { LOGIN } from './types';

export default function* rootSaga() {
    //Watch}
   yield all([
       watchUser(),
   ])
}

function* watchUser(){
    yield takeLatest(LOGIN, handleGetLogin) 
}