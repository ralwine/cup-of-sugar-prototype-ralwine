import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* sendInvite(action) {
    console.log('in admin saga', action.payload)
    try{
        const newInvite = yield axios.post('/api/admin', action.payload);
        console.log('in admin SAGA', newInvite)
        yield put({type: 'CREATE_NEW_INVITE', payload: newInvite})
    } catch (error) {
        console.log('sendInvite POST request failed', error)
    }
}
function* adminSaga() {
    yield takeLatest('SEND_INVITE', sendInvite);
  }
export default adminSaga;