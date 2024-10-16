import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const isValidCode = /^[1-5][0-9]{2}$/.test(code || '');
    const statusCode = (isValidCode && !isNaN(parseInt(code || ''))) ? parseInt(code || '') : 404;
    const navigate = useNavigate();
    let message;

    switch (statusCode) {
        case 404:
            message = '404 - Страница не найдена';
            break;
        case 500:
            message = '500 - Внутренняя ошибка сервера';
            break;
        default:
            message = `${statusCode} - Неизвестная ошибка`;
    }

    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h1" component="h1" gutterBottom>
                {message}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Вернуться на главную
            </Button>
        </Container>
    );
};

export default ErrorPage;
