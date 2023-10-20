
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Modal from '@mui/material/Modal';
import { Button, Box, Typography, Stack, Divider, Fab, Grid } from '@mui/material';



export default function ActivityCompleteModal({ offer, request }) {
    console.log('offer, request:', offer, request)

    const dispatch = useDispatch();
    const history = useHistory();

    // const group = useSelector((store => store.group))
    // changes state for the modal operation
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_INFO' });
    }, []);

    // claims or fulfills the activity and navigates back to activity feed
    const completeActivity = () => {
        // checks to see if it is an offer or request and dispatches accordingly
        offer ?
            dispatch({
                type: 'CLAIM_OFFER',
                payload: offer.id
            })
            :
            dispatch({
                type: 'FULFILL_REQUEST',
                payload: request.id
            })

        history.push('/activity')
    }

    // style the modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'secondary.main',
        border: 'info.main',
        borderWidth: 1,
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Button
              
                onClick={handleOpen}
                size="small"
                variant='contained'
                color="primary"
            >
                {offer ? 'Claim' : 'Fulfill'}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="complete activity modal"
                aria-describedby="modal to give more info when you fulfill or claim an activity"
            >
                <Box sx={style}>
                    {offer ?

                        (<Box>
                            <Typography id="modal-claim-offer" color='info.main' fontWeight='bold'>
                                {`You're claiming ${offer.item_name} from ${offer.name}. `}
                            </Typography>
                            <Typography mt={2} id="modal-claim-offer" color='info.main'>
                                {`They'll make the drop off at your group's exchange spot: ${offer.share_location}, or you can email them at ${offer.username} to work out a different pick-up plan.`}
                            </Typography>
                        </Box>)
                        :
                        (<Box>
                            <Typography id="modal-fulfill-request" color='info.main'fontWeight='bold'>
                                {`You're sharing ${request.item_name} with ${request.name}. `}
                            </Typography>
                            <Typography mt={2} id="modal-fulfill-request" color='info.main'>
                                {`Please drop it off at your group's exchange spot: ${request.share_location}, or you can email ${request.name} at ${request.username} to work out a different sharing plan.`}
                            </Typography>
                        </Box>)
                    }

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-around"
                        alignItems="center"
                        divider={<Divider orientation="vertical" flexItem />}
                        sx={{ mt: 3 }}
                    >


                        <Button
                            onClick={handleClose}
                            size="small"
                            variant='text'
                            color="primary"
                        >
                            {offer ? `I don't want to claim this offer.` : `I don't want to fulfill this request.`}
                        </Button>
                        <Fab
                            onClick={() => completeActivity()}
                            size="normal"
                            variant='extended'
                            color="success"
                        >
                            {offer ? 'Claim' : 'Fulfill'}
                        </Fab>
                    </Stack>
                </Box>
            </Modal>
            </div>
    )

}
