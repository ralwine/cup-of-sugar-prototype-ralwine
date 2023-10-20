import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import profileSaga from './profile.saga';
import offerSaga from './offer.saga';
import requestSaga from './request.saga';
import groupSaga from './group.saga';
import allergySaga from './allergy.saga';
import restrictionSaga from './restriction.saga';
import deleteActivitySaga from './deleteActivity.saga';
import categorySaga from './category.saga';
import adminSaga from './admin.saga';



// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    profileSaga(),
    offerSaga(),
    requestSaga(),
    groupSaga(),
    allergySaga(),
    restrictionSaga(),
    deleteActivitySaga(),
    categorySaga(),
    adminSaga(),
  ]);
}
