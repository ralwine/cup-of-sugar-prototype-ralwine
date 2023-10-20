import axios from "axios";
import { put, take, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 
// 'FETCH_REQUESTS' 
// 'ADD_REQUEST'
// 'FETCH_REQUEST_ITEM' actions

function* fetchRequests() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // gets all requests to be displayed in activity feed
        const response = yield axios.get('api/request', config);
        yield put({ type: 'SET_REQUESTS', payload: response.data });
    } catch (error) {
        console.log('fetchRequest get request failed', error)
    }
}

function* addRequest(action) {
    try {
        const newRequest = yield axios.post('/api/request', action.payload);
        console.log('in request SAGA', newRequest)
        yield put({ type: 'CREATE_NEW_REQUEST', payload: newRequest.data });
    }
    catch (error) {
        console.log(`addRequest POST request failed`, error);
    }
}

function* fetchRequestItem() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/request', config);
        yield put({ type: 'SET_REQUEST_ITEM', payload: response.data });
    } catch (error) {
        console.log('fetchRequestItem get request failed', error)
    }
}

function* updateRequest(action) {
    try {
        // PUTS the updated request from updateActivity reducer to the DB
        const updateRequest = action.payload
        yield axios({
            method: 'PUT',
            url: `api/request/${action.payload.id}`,
            data: updateRequest
        })
        // yield put({ type: 'FETCH_REQUESTS' });
    } catch (error) {
        console.log('updateRequest put request failed', error)
    }
}

function* claimRequest(action) {
    try {
        yield axios.put(`/api/request/fulfill/${action.payload}`)
        yield put({ type: 'FETCH_REQUESTS' })
    }
    catch (err) {
        console.log('Error with claiming Request', err)
    }
}

function* deleteRequest (action) {
    try {
        // DELETES the request from the DB
        const deleteRequest = action.payload
        yield axios({
            method: 'DELETE',
            url: `api/request/${action.payload}`,
            data: deleteRequest
        })

    } catch (error) {
        console.log('delete request failed', error)
    }}

function* requestSaga() {
    yield takeLatest('FETCH_REQUESTS', fetchRequests);
    yield takeLatest('ADD_REQUEST', addRequest);
    yield takeLatest('FETCH_REQUEST_ITEM', fetchRequestItem);
    yield takeLatest('UPDATE_REQUEST', updateRequest);
    yield takeLatest('FULFILL_REQUEST', claimRequest);
    yield takeLatest('DELETE_REQUEST', deleteRequest);
};

export default requestSaga;