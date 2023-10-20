import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_ALLERGY' actions
function* fetchAllergy() {
  try {
    const allergyResponse = yield axios.get('/api/allergy');
    yield put({ type: 'SET_ALLERGY', payload: allergyResponse.data });
  }
  catch (error) {
    console.log('User allergy GET request failed', error);
  }
}

function* allergySaga() {
  yield takeLatest('FETCH_ALLERGY', fetchAllergy);
}

export default allergySaga;