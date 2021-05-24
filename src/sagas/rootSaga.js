import { takeLatest, all, fork } from 'redux-saga/effects';
import { handleGetLogin } from './handlers/login';
import { LOGIN } from './userDuck';

export default function* rootSaga() {
    //Watcher
    yield all ([
        fork(watchUser),
    ])
}

function* watchUser(){
        yield all([
        takeLatest(LOGIN, handleGetLogin),
    ])
}