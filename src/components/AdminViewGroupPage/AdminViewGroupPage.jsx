import React, { useState } from 'react';
import { useEffect } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '@mui/material';

function AdminViewGroupPage() {

    return (
        <>
            <div>
                <h2>//Group name here</h2>
                {/* Group name renders here */}
            </div>
            <div>
                <h4>Sharing location is: </h4>
                {/* Sharing location name renders here */}
                <Button variant='contained' type="submit">
                    Edit
                </Button>
            </div>
            <div>
                <h4>Group Members: </h4>
            </div>
            <Button variant='contained' type="submit">
                + Add Member
            </Button>
        </>
    )
}

export default AdminViewGroupPage;