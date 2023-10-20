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
    CardActions
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
        <Card sx={{ width: '100%' }} >
            <CardActionArea onClick={() => handleActivityNav()} sx={{}}>
                {/* /* checks if the activity has been completed, if so displays a share card */}
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
                    // checks to see if offer and/or activity toggles are checked, and if so if the current activity matches the checked switch. 
                    ((activity.requested_on && activityView.requests)
                        ||
                        (activity.offered_on && activityView.offers))
                    &&
                    /* creates card content with conditional logic for request or offer  */
                    <CardContent sx={{ bgcolor: activity.offered_on ? 'primary.light' : 'primary.main' }}>

                        <CardMedia
                            component="img"
                            sx={{ width: 100, height: 100 }}
                            image={activity.imgpath}
                            alt="Offer or Request Image"
                        />
                        <Typography gutterBottom variant="button" color='info.main'>
                            {activity.offered_on ? 'offer' : 'request'}
                        </Typography>
                        <Typography variant="body1" color="info.main">
                            {`${activity.name} ${activity.offered_on ? 'offer' : 'request'}ed 
                    ${activity.item_name}. Expires on ${DateFormatter(activity.expires_on)}`}
                        </Typography>

                    </CardContent>
                }
            </CardActionArea >
            <CardActions>
                {user.role > 0 &&
                    <DeleteButton activity={activity} />
                }
            </CardActions>

        </Card>
    );
}

export default ActivityCardContent;

