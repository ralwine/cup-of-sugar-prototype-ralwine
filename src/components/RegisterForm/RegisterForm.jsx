import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [group, setGroup] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        group: group,
      },
    });

    history.push('/howitworks')
  }; // end registerUser



  return (
    <form className="formPanel" onSubmit={registerUser}>
       <Stack alignItems='center' spacing={2}>
       <div>
          <Typography variant='h5'>Sign Up</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      </div>
      <div>
        <label htmlFor="username">
        <Typography variant='body1' align='left'>User Email:</Typography>
          <TextField
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
        <Typography variant='body1' align='left'>Create Password:</Typography>
          <TextField
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
        <Typography variant='body1' align='left'>Invite Code:</Typography>
          <TextField
            type="group"
            name="group"
            value={group}
            required
            onChange={(event) => setGroup(event.target.value)}
            sx={{ mb: 2 }}
          />
        </label>
      </div>
      <div>
        <Button
          type="submit"
          name="submit"
          variant="contained">
          Sign Up
        </Button>
      </div>
      </Stack>
    </form>
  );
}

export default RegisterForm;
