import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

// This is a worker saga; will be fired upon 
// 'FETCH_USER_PROFILE' 
// 'UPDATE_PROFILE 
// 'ADD_USER_PROFILE' actions

function* fetchUserProfile() {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        const response = yield axios.get('api/profile', config);
        yield put({ type: 'SET_USER_PROFILE', payload: response.data});
    } catch (error) {
        console.log('fetchUserProfile get request failed', error)
    }
}

function* updateProfile (action) {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        yield axios ({
            method: 'PUT',
            url: 'api/profile', 
            config,
            data: action.payload
        });
        yield put({ 
            type: 'FETCH_USER_PROFILE'
        });
    } catch (error) {
        console.log('updateProfile request failed', error)
    }
}

// Creates new user profile preferences and information to user_profile table in database
function* setUserInfo (action) {
    try {
        const headers = {
            'content-type': 'multipart/form-data'
        }
        const profileForm = new FormData();
// appends profile information to the profile form so that it can be posted to db as a multipart form
        profileForm.append('image', action.payload.imgpath);
        profileForm.append('name', action.payload.name);
        profileForm.append('homemade_pref', action.payload.homemade_pref);
        profileForm.append('about', action.payload.about);
        profileForm.append('allergy_type', action.payload.allergy_type);
        profileForm.append('restriction_type', action.payload.restriction_type)

// Posts profile info to db
      const newUserInfo = yield axios({
        method: 'POST',
        url: '/api/profile', 
        headers: headers,
        data: profileForm
    })
      yield put({ type: 'SET_USER_PROFILE', payload: newUserInfo.data});
      yield put({ type: 'FETCH_USER_PROFILE' });
    }
    catch (error) {
      console.log(`User's profile information POST request failed`, error);
    }
  }

function* profileSaga() {
    yield takeLatest('FETCH_USER_PROFILE', fetchUserProfile);
    yield takeLatest('UPDATE_PROFILE', updateProfile);
    yield takeLatest('ADD_USER_PROFILE', setUserInfo);
};

export default profileSaga;