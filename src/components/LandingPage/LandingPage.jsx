import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import topIcon from '../../assets/Squiggle Arrow RotatedTop.png';
import cupIcon from '../../assets/cupOfSugarIcon.png';
import bottomIcon from '../../assets/Squiggle Arrow RotatedBottom.png'
// CUSTOM COMPONENTS
import { Typography, Box, Stack, Button } from '@mui/material';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  const onRegistration = (event) => {
    history.push('/registration');
  };

  return (
    <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: 0 }}>
      <Stack spacing={2} alignItems='center' justifyContent='center'>
        <img src={topIcon} width={120} height={120} />
        <Typography variant='h4' align='center'>
          Welcome
        </Typography>
        <img src={cupIcon} width={120} height={120} />
        <Typography variant='h5' align='center'>
          to <br /> Cup of Sugar
        </Typography >
        <img src={bottomIcon} width={120} height={120} />
        <Button
          variant='contained'
          sx={{ width: '100px' }}
          onClick={onLogin}
        >
          Log In
        </Button>
        <Button
          variant='contained'
          sx={{ bgcolor: 'success.main', color: 'secondary.light', width: '100px' }}
          onClick={onRegistration}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  )
}

export default LandingPage;
