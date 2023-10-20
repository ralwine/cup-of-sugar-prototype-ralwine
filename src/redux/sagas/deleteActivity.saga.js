import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteActivity(action) {
    console.log('activity delete', action.payload)
try 
{
    const activity = action.payload;
      activity.offered_on ?
        yield axios({
            method: 'DELETE',
            url: `/api/offer/${activity.id}`,
        })
    :
        yield axios({
            method: 'DELETE',
            url: `/api/request/${activity.id}`,
        })
        activity.offered_on ?
        yield put({
            type: 'FETCH_OFFERS'
        })
        :
        yield put({
            type: 'FETCH_REQUESTS'
        })
    }
    catch (error) {
        console.log('Error with deleting activity saga:', error);
    }
}

function* deleteActivitySaga() {
    yield takeLatest('DELETE_ACTIVITY', deleteActivity);
}

export default deleteActivitySaga;