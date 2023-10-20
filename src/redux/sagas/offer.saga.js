import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 'FETCH_USER_PROFILE' actions
function* fetchOffers() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // gets all offers to be displayed in the activity feed
        const response = yield axios.get('api/offer', config);
        yield put({ type: 'SET_OFFERS', payload: response.data });
    } catch (error) {
        console.log('fetchOffer GET request failed', error)
    }
}

function* fetchOfferItem() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/offer', config);
        yield put({ type: 'SET_OFFER_ITEM', payload: response.data });
    } catch (error) {
        console.log('fetchOfferItem get request failed', error)
    }
}

function* addOffer(action) {
    try {
        // Posts a new offer to the database
        const headers = {
            'content-type': 'multipart/form-data'
        }
        const offerForm = new FormData();
        // appends offer information to the profile form so that it can be posted to db as a multipart form
        offerForm.append('image', action.payload.imgpath);
        offerForm.append('item_name', action.payload.item_name);
        offerForm.append('homemade', action.payload.homemade);
        offerForm.append('description', action.payload.description);
        offerForm.append('perishable', action.payload.perishable);
        offerForm.append('category_type', action.payload.category_type);
        offerForm.append('offered_on', action.payload.offered_on);
        offerForm.append('best_by', action.payload.best_by);
        offerForm.append('expires_on', action.payload.expires_on);

       yield axios({
            method: 'POST',
            url: '/api/offer',
            headers: headers,
            data: offerForm
        })
        yield put({ type: 'FETCH_OFFERS' });
    }
    catch (error) {
        console.log(`addOffer POST request failed`, error);
    }
}

function* updateOffer(action) {    
    try {
        const updateOffer = action.payload
        yield axios({
            method: 'PUT',
            url: `api/offer/${action.payload.id}`,
            data: updateOffer
        })
        // yield put({ type: 'FETCH_OFFERS' });
    } catch (error) {
        console.log('fetchOfferItem get request failed', error)
    }
}

function* claimOffer (action) {
    console.log('claim offer SAGA', action.payload)
    try {
        yield axios.put(`/api/offer/claim/${action.payload}`)
        yield put({ type: 'FETCH_OFFERS'})
    }
    catch (err) {
        console.log('Error with claiming Offer', err)
    }
}

function* deleteOffer (action) {
    try {
        // DELETES the offer from the DB
        const deleteOffer = action.payload
        yield axios({
            method: 'DELETE',
            url: `api/offer/${action.payload}`,
            data: deleteOffer
        })

    } catch (error) {
        console.log('delete offer failed', error)
    }}

function* offerSaga() {
    yield takeLatest('FETCH_OFFERS', fetchOffers);
    yield takeLatest('FETCH_OFFER_ITEM', fetchOfferItem);
    yield takeLatest('ADD_OFFER', addOffer);
    yield takeLatest('UPDATE_OFFER', updateOffer);
    yield takeLatest('CLAIM_OFFER', claimOffer);
    yield takeLatest('DELETE_OFFER', deleteOffer);
};

export default offerSaga