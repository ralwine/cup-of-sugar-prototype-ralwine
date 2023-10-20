import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_RESTRICTION' actions
function* fetchRestriction() {
  try {
    const restrictResponse = yield axios.get('/api/restriction');
    yield put({ type: 'SET_RESTRICTION', payload: restrictResponse.data });
  }
  catch (error) {
    console.log('User gender GET request failed', error);
  }
}

function* restrictionSaga() {
  yield takeLatest('FETCH_RESTRICTION', fetchRestriction);
}

export default restrictionSaga;