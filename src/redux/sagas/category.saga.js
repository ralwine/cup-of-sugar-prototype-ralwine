import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_ALLERGY' actions
function* fetchCategory() {
  try {
    const categoryResponse = yield axios.get('/api/category');
    yield put({ type: 'SET_CATEGORY', payload: categoryResponse.data });
  }
  catch (error) {
    console.log('User category GET request failed', error);
  }
}

function* categorySaga() {
  yield takeLatest('FETCH_CATEGORY', fetchCategory);
}

export default categorySaga;