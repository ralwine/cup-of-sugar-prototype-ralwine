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
    <Card sx={{ width: '100%', bgcolor: activity.offered_on ? 'primary.light' : 'primary.main'  }} >
        <CardActionArea onClick={() => handleActivityNav()} >
<Stack direction='row'>
        <CardMedia
                            component="img"
                            sx={{ width: 100, height: 100, p: 1 }}
                            image={activity.imgpath}
                            alt="Offer or Request Image"
                        />

            {/*  */}
            {activityView.shares && (activity.claimed_on || activity.fulfilled_on) ?
                <CardContent sx={{ bgcolor: 'warning.light' }}>
                    <Typography gutterBottom variant="button" color='info.main'>
                        Share
                    </Typography>
                    <Typography variant="body1" color="info.main">
                        {`${activity.name} 
                            shared ${activity.item_name} 
                            with ${activity.claimed_by_user ? activity.claimed_by_user : activity.fulfilled_by_user} 
                            on ${activity.claimed_on ? DateFormatter(activity.claimed_on) : DateFormatter(activity.fulfilled_on)}`}
                    </Typography>
                </CardContent>
                :
                // checks to see if the activity has been claimed/fulfilled or not.  
                (!activity.claimed_on && !activity.fulfilled_on) &&
                <CardContent sx={{ bgcolor: activity.offered_on ? 'primary.light' : 'primary.main' }}>
                    <Typography gutterBottom variant="button" color='info.main'>
                        {activity.offered_on ? 'offer' : 'request'}
                    </Typography>
                    <Typography variant="body1" color="info.main">
                        {`${activity.name} ${activity.offered_on ? 'offer' : 'request'}ed 
                            ${activity.item_name} 
                            on ${activity.offered_on ? DateTimeFormatter(activity.offered_on) : DateTimeFormatter(activity.requested_on)}`}
                    </Typography>
                </CardContent>
            }
            </Stack>
        </CardActionArea >
        <CardActions>
            {user.role > 0 &&
                <DeleteButton activity={activity} />
            }
        </CardActions>
       
    </Card>
);
}

export default ActivityCardContent
