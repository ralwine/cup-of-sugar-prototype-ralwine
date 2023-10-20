import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ActivityCardContent from './ActivityCardContent/ActivityCardContent';
import MyActivity from './MyActivity/MyActivity';
// material ui imports
import {
    AppBar,
    Toolbar,
    Card,
    Switch,
    Grid,
    Box,
    Typography,
    List,
    FormGroup,
    FormControlLabel
} from '@mui/material';

// displays user activity and all offers, requests, and shares
function ActivityFeed() {
    const dispatch = useDispatch();
    const offers = useSelector((store) => store.offers);
    const requests = useSelector((store) => store.requests);
    const user = useSelector((store) => store.user);
    const [offersAndRequests, setoffersAndRequests] = useState([]);

    // states for the toggle switches to change what is being shown in the activity lists
    const [activityView, setActivityView] = useState({
        offers: true,
        requests: true,
        shares: true,
    });

    //   gets activity information for current user's group
    useEffect(() => {
        dispatch({ type: 'FETCH_OFFERS' });
        dispatch({ type: 'FETCH_REQUESTS' });
    }, []);

    useEffect(() => {
        if (Array.isArray(offers) && Array.isArray(requests)) {
            // declare and assign an array of all the offers and requests, and then sorts them by created date
            const oAndR = offers.concat(requests);
            oAndR.sort((a, b) => {
                return new Date(a.expires_on) - new Date(b.expires_on);
            });
            setoffersAndRequests(oAndR)
        }
    }, [offers, requests]);

    //   sets toggle switch state
    const handleViewChange = (event) => {
        setActivityView({
            ...activityView,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Box sx={{ width: '95%', margin: 'auto' }} >
            <Typography align='center' variant='h6' sx={{ p: 2 }}>
                Activities
            </Typography>
                    <FormGroup row >
                        <FormControlLabel
                            control={<Switch
                                checked={activityView.requests}
                                onChange={handleViewChange}
                                name="requests" />}
                            label={<Typography variant="body2">Requests</Typography>} />
                        <FormControlLabel
                            control={<Switch
                                checked={activityView.shares}
                                onChange={handleViewChange}
                                name="shares" />}
                            label={<Typography variant="body2">Shares</Typography>} />
                        <FormControlLabel
                            control={<Switch
                                checked={activityView.offers}
                                onChange={handleViewChange}
                                name="offers" />}
                            label={<Typography variant="body2">Offers</Typography>} />
                    </FormGroup>
            <Box sx={{ margin: 'auto' }}>
                <Typography align='center' sx={{ p: 2 }}>
                    My Activity
                </Typography>
                {/* Creates a list of user's offers and requests in order of when they created them */}
                <Card sx={{ bgcolor: 'secondary.light' }} >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <List dense sx={{ width: '95%' }} >
                            {offersAndRequests.map((activity, index) => (
                                (((user.id === activity.user_id)
                                    ||
                                    (user.id === (activity.claimed_by_user || activity.fulfilled_by_user)))
                                    &&
                                    (activity.claimed_on || activity.fulfilled_on))
                                && <MyActivity activity={activity} user={user} index={index} />
                            ))}
                            {offersAndRequests.map((activity, index) => (
                                ((user.id === activity.user_id)
                                    &&
                                    !activity.claimed_on
                                    &&
                                    !activity.fulfilled_on)
                                && <MyActivity activity={activity} user={user} index={index} />
                            ))}
                        </List>
                    </Box>
                </Card>
            </Box>
            <Typography align='center' sx={{ p: 2 }}>
                All Activity
            </Typography>
            <Grid container spacing={2} >
                {/* maps over offers and builds cards for each one */}
                {offersAndRequests.map((activity, index) => {
                    return (
                        // checks to see if activity should be displayed based on toggle switches
                        (activity.requested_on && activityView.requests)
                        ||
                        (activity.offered_on && activityView.offers)
                        ||
                        ((activity.fulfilled_on || activity.claimed_on) && activityView.shares)
                    )
                        &&
                        (
                            <Grid item key={index} xs={12} sm={6} md={6} >

                                <Card sx={{ width: '100%' }} >
                                    <ActivityCardContent
                                        activity={activity}
                                        activityView={activityView}
                                    />
                                </Card>
                            </Grid>
                        );
                })
                }
            </Grid>
        </Box>
    );
}

export default ActivityFeed;