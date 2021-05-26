import { takeLatest, all } from 'redux-saga/effects';
import { handleGetLogin } from './handlers/loginHand';
import { LOGIN } from './types';

export default function* rootSaga() {
   yield all([
       watchUser(),
   ])
}

//Watchers
function* watchUser(){
    yield takeLatest(LOGIN, handleGetLogin) 
}