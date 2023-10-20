import React from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
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
    </div>
  );
}

export default RegisterPage;
