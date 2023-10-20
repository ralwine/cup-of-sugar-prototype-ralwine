// React and Redux imports 
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
// Material UI imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";

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
               <Stack direction="column" spacing={2} >
                    <Typography variant="h4" align="center">{profile[0]?.name}</Typography>
                 <Grid align="center">
                  <img src={profile[0]?.imgpath} style={{width: '250px', height: '250px', alignContent: 'center'}} alt="user's profile photo"/> 
                  </Grid>
              </Stack>
              </Box>
                <br></br>
                <Box sx={{ mx: '1rem' }}>
                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>About Me</Typography>
                    <Typography variant="h6">{profile[0]?.about}</Typography><br></br>

                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>My Allergies</Typography>
                    <Typography variant="h6">{profile[0]?.allergy_type ? removeDuplicates(
                        profile[0]?.allergy_type).join(', ') : 'None'}</Typography><br></br>

                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>My Dietary Restrictions</Typography>
                    <Typography variant="h6">{profile[0]?.restriction_type ? removeDuplicates(
                        profile[0]?.restriction_type).join(', ') : 'None'}</Typography>
                </Box >
                <Box>
                <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button type="submit" variant="contained" color="warning" onClick={() => linkEditProfile()}>Edit</Button>
                    <Button type="submit" variant="contained" onClick={() => handleGroupInfo()}>Group Info</Button>
                </footer>
            </Box>
        </>
    )
};

export default UserProfile;