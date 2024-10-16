// src/components/LoginForm.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);
  const [error, setError] = React.useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Имя пользователя обязательно'),
      password: Yup.string().required('Пароль обязателен'),
    }),
    onSubmit: async (values) => {
      setError(null);
      try {
        const resultAction = await dispatch(loginUser(values));
        if (loginUser.fulfilled.match(resultAction)) {
          // Сохранение токена в localStorage или других безопасных местах
          localStorage.setItem('token', resultAction.payload.token);
          navigate('/dragons');
        } else {
          if (resultAction.payload) {
            setError(resultAction.payload);
          } else {
            setError('Неизвестная ошибка');
          }
        }
      } catch (err) {
        setError('Произошла ошибка при входе');
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      {authState.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {authState.error}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Имя пользователя"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        margin="normal"
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Пароль"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
      />
      <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
        Войти
      </Button>
    </Box>
  );
};

export default LoginForm;
