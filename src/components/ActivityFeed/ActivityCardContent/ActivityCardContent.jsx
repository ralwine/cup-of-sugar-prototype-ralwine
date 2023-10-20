import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimeFormatter, DateFormatter } from '../../../utils/DateTimeFormatter/DateTimeFormatter';
import DeleteButton from '../../DeleteButton/DeleteButton';
// Material UI imports
import {
    Card,
    CardContent,
    CardActionArea,
    Typography,
    CardMedia,
    CardActions,
    Stack
} from '@mui/material';

function ActivityCardContent({ activity, activityView }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)
    const profile = useSelector((store) => store.profile)


    // navigates to clicked activity info page for clicked card
    const handleActivityNav = () => {
        dispatch({ type: "SET_CURRENT_ACTIVITY", payload: activity })
        if (activity.offered_on && !activity.claimed_on) {
            history.push('./offeritem')
        } else if (activity.requested_on && !activity.fulfilled_on) {
            history.push('./requestitem')
        }
    }

    return (
        <Card sx={{
            width: '100%',
            bgcolor: (activity.claimed_on || activity.fulfilled_on)
                ? 'success.main'
                :
                activity.offered_on
                    ? 'primary.light'
                    :
                    'primary.main'
        }} >
            <CardActionArea onClick={() => handleActivityNav()} >
                <Stack direction='row'>
                    <CardMedia
                        component="img"
                        sx={{ width: 100, height: 75, p: 1 }}
                        image={activity.imgpath}
                        alt="Offer or Request Image"
                    />

                    {/*  */}
                    {activityView.shares && (activity.claimed_on || activity.fulfilled_on) ?
                        <CardContent id='shareCard' sx={{ bgcolor: 'success.main', width: '100%', p: 1  }}>
                                  <Stack 
                            direction='row'
                            justifyContent="space-between"
                            alignItems="baseline"
                            spacing={2}>
                            <Typography gutterBottom variant="overline" color='secondary.main'>
                                Share
                            </Typography>
                            {/* <Typography gutterBottom variant="overline" color='info.light'>
                            {`expires ${DateFormatter(activity.expires_on)}`}
                            </Typography> */}
                            </Stack>
                            <Typography variant="body1" color="secondary.light">
                                {`${activity.name} 
                            shared ${activity.item_name} 
                            with ${activity.claimed_by_user ? activity.claimed_by_user_name : activity.fulfilled_by_user_name} 
                            on ${activity.claimed_on ? DateFormatter(activity.claimed_on) : DateFormatter(activity.fulfilled_on)}`}
                            </Typography>
                        </CardContent>
                        :
                        // checks to see if the activity has been claimed/fulfilled or not.  
                        (!activity.claimed_on && !activity.fulfilled_on) &&
                        <CardContent id='activityCard' sx={{ bgcolor: activity.offered_on ? 'primary.light' : 'primary.main', width: '100%', p: 1 }}>
                            <Stack
                                direction='row'
                                justifyContent="space-between"
                                alignItems="baseline"
                                spacing={2}>
                                <Typography gutterBottom variant="overline" color='info.main'>
                                    {activity.offered_on ? 'offer' : 'request'}
                                </Typography>
                                <Typography gutterBottom variant="overline " color='info.main'>
                                    {`expires ${DateFormatter(activity.expires_on)}`}
                                </Typography>
                            </Stack>
                            <Typography variant="body1" color='info.dark' >
                                {`${activity.name} ${activity.offered_on ? 'offer' : 'request'}ed ${activity.item_name} `}
                            </Typography>
                        </CardContent>
                    }
                </Stack>
            </CardActionArea >
            <CardActions style={{ justifyContent: 'flex-end' }}>
                {user.role > 0 &&
                    <DeleteButton activity={activity} />
                }
            </CardActions>
        </Card>
    );
}

export default ActivityCardContent
