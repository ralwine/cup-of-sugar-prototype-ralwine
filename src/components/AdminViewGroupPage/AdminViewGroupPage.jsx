import React from 'react';
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