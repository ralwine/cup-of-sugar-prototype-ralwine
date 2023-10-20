import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// This an admin only page!
function AddMemberForm() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('');
    const [subjectLine, setSubjectLine] = useState('');
    const [adminMessage, setAdminMessage] = useState('');

    const adminInvite = (event) => {
        event.preventDefault();
        console.log("sending admin invite")
    }

    return (
        <>
            <form className='formPanel' onSubmit={adminInvite}>
                <div>
                    <label htmlFor='userEmail'>
                        Email:
                        <TextField
                            type="text"
                            placeholder="Please enter admin email here"
                            value={userEmail}
                            onChange={(event) => setUserEmail(event.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='subjectLine'>
                        Subject Line:
                        <TextField
                            type="text"
                            placeholder="Include name of invitee"
                            value={subjectLine}
                            onChange={(event) => setSubjectLine(event.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='adminMessage'>
                        Message:
                        <TextField
                            id="adminMessage"
                            type="text"
                            multiline rows={4}
                            placeholder="Post invite information here"
                            value={adminMessage}
                            onChange={(event) => setAdminMessage(event.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </label>
                </div>
                <div>
                    <Button variant='contained' id="submit">
                        Send Invite
                    </Button>
                </div>
            </form>
        </>
    );
}

export default AddMemberForm;