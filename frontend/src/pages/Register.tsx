import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Регистрация
        </Typography>
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
