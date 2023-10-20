import { useState } from 'react';
import { useSelector } from 'react-redux';
import MaterialTheme from '../../../MaterialTheme/MaterialTheme';
import { DateFormatter } from '../../../../utils/DateTimeFormatter/DateTimeFormatter';
// material ui imports
import {
    IconButton,
    Modal,
    Button,
    Box,
    Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ShareInfoButton({ activity }) {
    const user = useSelector((store => store.user))
    const style = MaterialTheme().modalStyle;
    console.log('activity', activity)

    // changes state for the modal operation
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton
                onClick={handleOpen}
                size="small"
                variant='outlined'
                color="info.light"
            >
                <VisibilityIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="share info modal"
                aria-describedby="modal to see more info about a completed share"
            >
                <Box sx={style}>
                    {user.id === activity.user_id ?
                        activity.claimed_on ?
                        // text for you made an offer and someone else claimed
                            <Typography id="modal-share-info" color='info.main'>
                                {`You shared ${activity.item_name} with ${activity.claimed_by_user_name} on ${DateFormatter(activity.claimed_on)}.`}
                                <br />
                                {`Please leave it in your group's sharing location: ${activity.share_location}, or email ${activity.claimed_by_user_name} at ${activity.username} to arrange an exchange.`}
                                <br />
                                Thanks for sharing and helping to reduce food waste!
                            </Typography>
                            :
                            // text for you made a request and someone else fulfilled
                            <Typography id="modal-share-info" color='info.main'>
                                {`${activity.fulfilled_by_user_name} shared ${activity.item_name} with you on ${DateFormatter(activity.fulfilled_on)}.`}
                                <br />
                                {`Please retrieve it from your group's sharing location: ${activity.share_location}, or email ${activity.fulfilled_by_user_name} at ${activity.username} to arrange an exchange.`}
                                <br />
                                Thanks for sharing and helping to reduce food waste!
                            </Typography>
                        :
                        activity.claimed_on ?
                        // text for you claimed someone else's offer
                        <Typography id="modal-share-info" color='info.main'>
                            {`You claimed ${activity.item_name} from ${activity.name} on ${DateFormatter(activity.claimed_on)}.`}
                            <br />
                            {`Please retrieve it from your group's sharing location: ${activity.share_location}, or email ${activity.name} at ${activity.username} to arrange an exchange.`}
                            <br />
                            Thanks for sharing and helping to reduce food waste!
                        </Typography>
                        :
                        // text for you fulfilled someone else's request
                        <Typography id="modal-share-info" color='info.main'>
                            {`You shared ${activity.item_name} with ${activity.name} on ${DateFormatter(activity.fulfilled_on)}.`}
                            <br />
                            {`Please leave it in your group's sharing location: ${activity.share_location}, or email ${activity.name} at ${activity.username} to arrange an exchange.`}
                            <br />
                            Thanks for sharing and helping to reduce food waste!
                        </Typography>
                    }
                    <Button
                        onClick={handleClose}
                        size="small"
                        variant='contained'
                        color="primary"
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    )
}