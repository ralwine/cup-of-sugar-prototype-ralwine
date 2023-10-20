import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import cupIcon from '../../assets/cupOfSugarIcon.png'
// material ui imports
import { Button, Box, Typography } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Box >
    <center>
    <img src={cupIcon} alt='Cup Logo' width={100} height={100}/>
      <RegisterForm />
      <Typography>Already a member?</Typography>
        <Button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/howitworks');
          }}
        >
          Login
        </Button>
      </center>
    </Box>
  );
}

export default RegisterPage;
