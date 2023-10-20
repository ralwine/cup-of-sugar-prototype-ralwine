import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// This an admin only page!
function AddMemberForm() {

    const history = useHistory();
    const dispatch = useDispatch();
    const group = useSelector((store) => store.group)
    const [userEmail, setUserEmail] = useState('');
    const [subjectLine, setSubjectLine] = useState('Welcome to Cup of Sugar!');
    const [emailText, setEmailText] = useState(`Welcome to Cup of Sugar! 
    Cup of Sugar is a handy dandy app that will let you share food with your neighbors, 
    reducing food waste and building community, all at the same time!
    
    All you have to do is click on this link, make a username and password and enter in our group join code: ${group.name} `);

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP_INFO' })
    }, [])

    const adminInvite = (event) => {
        event.preventDefault();
        const userInvite = {
            user_email: userEmail,
            subject: subjectLine,
            message: emailText,
        }
        //dispatch to admin.saga
        dispatch({
            type: 'SEND_INVITE', payload: userInvite
        })
        console.log("sending admin invite")
        // Navigate to the group page
        history.push('/usergroup');
    }

    return (
        <>
            <form className='formPanel' onSubmit={adminInvite}>
                <div>
                    <label htmlFor='userEmail'>
                        Email Address:
                        <TextField
                            required
                            type="text"
                            placeholder="Who would you like to invite to join Cup of Sugar?"
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
                            required
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
                            required
                            id="adminMessage"
                            type="text"
                            multiline rows={4}
                            placeholder="Post invite information here. Please include invite code"
                            value={emailText}
                            onChange={(event) => setEmailText(event.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </label>
                </div>
                <div>
                    <Button variant='contained' type="submit">
                        Send Invite
                    </Button>
                </div>
            </form>
        </>
    );
}

export default AddMemberForm;