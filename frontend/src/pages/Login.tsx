import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Вход
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default Login;
