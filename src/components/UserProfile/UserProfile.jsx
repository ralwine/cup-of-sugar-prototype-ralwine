// React and Redux imports 
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
// Material UI imports
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// This function will fetch user profile info:
// Username, Picture, About Section, Allergies, and Dietary Restrictions,
// allow for editing user profile info (navigate to user form),
// and allow for navigation to group info view
// Both bottom and top nav bar will be available
function UserProfile() {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();
    const profile = useSelector((store) => store.profile);


    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PROFILE' });
    }, [dispatch]);


    // will this send user to original user profile form or new page EditProfile?
    const linkEditProfile = () => {
        // dispatch to 'SET_EDIT_PROFILE' with payload goes here
        // This will need an edit_profile reducer
        // history.push(`edit_profile`)
        dispatch({ type: 'SET_EDIT_PROFILE', payload: profile })
        // navigate to editprofile page
        history.push('/editprofile')

    }

    function handleGroupInfo() {
        {
            dispatch({ type: 'SET_GROUP_INFO', payload: profile })
            history.push(`/usergroup`)
        }
    }

    function removeDuplicates(array) {
        return [...new Set(array)];
    }

    return (
        <>
            <Box>
                <header>
                    <Typography variant="h3">Cup of Sugar</Typography>
                    <img src={profile[0]?.imgpath} alt="user's profile photo" />
                </header>

                <section className="user-profile">

                    <Typography variant="h4">{profile[0]?.name}</Typography>

                    <Typography variant="h5">About Me</Typography>
                    <Typography variant="h6">{profile[0]?.about}</Typography>

                    <Typography variant="h5">My Allergies</Typography>
                    <Typography variant="h6">{profile[0]?.allergy_type ? removeDuplicates(
                        profile[0]?.allergy_type).join(', ') : 'None'}</Typography>

                    <Typography variant="h5">My Dietary Restrictions</Typography>
                    <Typography variant="h6">{profile[0]?.restriction_type ? removeDuplicates(
                        profile[0]?.restriction_type).join(', ') : 'None'}</Typography>

                </section >

                <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button type="submit" variant="contained" onClick={() => linkEditProfile()}>Edit</Button>
                    <Button type="submit" variant="contained" onClick={() => handleGroupInfo()}>Group Info</Button>
                </footer>
            </Box>
        </>
    )

};

export default UserProfile;