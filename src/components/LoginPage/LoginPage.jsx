import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import cupIcon from '../../assets/cupOfSugarIcon.png'

function LoginPage() {
  const history = useHistory();

  return (

    <Box >
     <center>
       <img src={cupIcon} alt='Cup Logo' width={100} height={100}/>
      <LoginForm />
      <Typography>Not a member yet?</Typography>
        <Button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Sign Up
        </Button>
      </center>
    </Box>
  );
}

export default LoginPage;
