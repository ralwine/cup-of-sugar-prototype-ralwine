import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function UpdateActivityButton({ activity }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // updates activity
    const handleUpdate = () => {
        dispatch({ type: 'SET_UPDATE_ACTIVITY', payload: activity })
        activity.offered_on ?
        history.push('/updateoffer')
        :
        history.push('/updaterequest')
    }

    return (
        <IconButton onClick={handleUpdate} edge="end" aria-label="delete" >
            <EditIcon />
        </IconButton>
    )
}