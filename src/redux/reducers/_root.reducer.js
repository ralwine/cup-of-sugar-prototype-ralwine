import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import profile from './profile.reducer';
import editProfile from './editProfile.reducer';
import requests from './request.reducer';
import requestItem from './requestitem.reducer';
import offers from './offer.reducer';
import offerItem from './offeritem.reducer';
import group from './group.reducer';
import activityItem from './activityItem.reducer'
import allergy from './allergy.reducer';
import restriction from './restriction.reducer';
import updateActivity from './updateActivity.reducer';
import groupMembers from './groupmembers.reducer';
import category from './category.reducer';
import selectedMember from './selectedMember.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  profile, // contains a user's profile information for user profile view
  editProfile, // contains a user's edited profile info
  requests, // contains all requests for a specific group
  requestItem, // contains specific request item
  offers, // contains all offers for a specific group
  offerItem, // contains specific offer item
  group, // contains all group info & members of group
  groupMembers, // contains all members in a group, member data sent is id and name
  activityItem, // contains current activity item when user clicks on a card in the activity feed.
  allergy, // contains all allergy selection options
  category, // contains all category selection options
  restriction, // contains all restriction selection options\
  selectedMember, // contains data about selected group member
  updateActivity, // sets and then updates the activity being updated

  
});

export default rootReducer;
