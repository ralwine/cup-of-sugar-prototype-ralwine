import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';
import { Button, Box, Typography, Stack, Divider } from '@mui/material';

export default function DeleteButton({ activity }) {
    const dispatch = useDispatch();
    // changes state for the modal operation
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // deletes clip
    const handleDelete = () => {
        console.log('in handle delete', activity)
        dispatch({ type: 'DELETE_ACTIVITY', payload: activity });
        handleClose();
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
                variant='text'
                color="error"
            >
                Delete
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="delete activiy modal"
                aria-describedby="modal to check if you want to delete the activity"
            >
                <Box sx={style}>
                    <Typography id="modal-delete-activity" color='info.main'>
                        Are you sure you want to delete the activity {activity.item_name} ? 
                        It will be deleted from the activity list permanently.
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-around"
                        alignItems="center"
                        divider={<Divider orientation="vertical" flexItem />}
                        sx={{mt: 3}}
                        >

                        <Button
                            onClick={() => handleDelete()}
                            size="small"
                            variant='contained'
                            color="error"
                        >
                            Yes, delete
                        </Button>
                        <Button
                            onClick={handleClose}
                            size="small"
                            variant='contained'
                            color="primary"
                        >
                            No, save
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )

}

