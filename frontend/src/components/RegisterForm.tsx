import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RegisterRequest, RegisterResponse } from '../types/User';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const formik = useFormik<RegisterRequest>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Имя пользователя должно быть не менее 3 символов')
        .required('Имя пользователя обязательно'),
      password: Yup.string()
        .min(6, 'Пароль должен быть не менее 6 символов')
        .required('Пароль обязателен'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно'),
    }),
    onSubmit: async (values) => {
      setError(null);
      setSuccess(null);
      try {
        const payload = {
          username: values.username,
          password: values.password,
        };
        const response = await axios.post<RegisterResponse>('/api/register', payload);
        if (response.data.success) {
          setSuccess('Регистрация прошла успешно! Перенаправление на страницу входа...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setError(response.data.message || 'Произошла ошибка при регистрации');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Произошла ошибка при регистрации');
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
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
        Зарегистрироваться
      </Button>
    </Box>
  );
};

export default RegisterForm;
