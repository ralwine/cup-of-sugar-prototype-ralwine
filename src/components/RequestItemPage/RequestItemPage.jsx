import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from "react-router-dom";
import ActivityCompleteModal from "../ActivityCompleteModal/ActivityCompleteModal";
import { DateTimeFormatter } from "../../utils/DateTimeFormatter/DateTimeFormatter"
// material ui imports
// material ui imports
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function RequestItemPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();
    const profile = useSelector((store) => store.profile);
    const activity = useSelector((store) => store.activityItem)
    console.log('activity in request item:', activity)

    return (
        <>
            <Box>
                <header>
                </header>
                <section className='request-item'>
                    <Grid container spacing={2} sx={{ mx: '1rem' }}>

                        <Grid xs={12} mt={2} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5">{activity.name} requested</Typography>
                        </Grid>
                        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant='h4'> {activity.item_name}
                            </Typography>
                        </Grid> 

                        <Grid xs={12} mt={2} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="subtitle1">{activity.description}</Typography>
                        </Grid>
                        <Grid xs={12} mt={2} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h6">This request expires on: {DateTimeFormatter(activity.expires_on)}</Typography>
                        </Grid>
                    </Grid>
                </section>
                <footer>
                    <ActivityCompleteModal request={activity} />
                </footer>
            </Box>
        </>
    );
}

export default RequestItemPage;