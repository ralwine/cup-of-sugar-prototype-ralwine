import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { Button, Stack, Typography} from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Stack alignItems='center' spacing={2}>
        <div>
          <Typography variant='h5'>Log In</Typography>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
        </div>
        <div>
          <label htmlFor="username">
            <Typography variant='body1' align='left'>User Email:</Typography>
            <TextField
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <Typography variant='body1' align='left'>User Password:</Typography>
            <TextField
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              sx={{ mb: 2 }}
            />
          </label>
        </div>
      <div>
          <Button
            type="submit"
            name="submit"
            variant="contained"
          >
            Log In
          </Button>
          </div>
        </Stack> 
    </form>
  );
}

export default LoginForm;
