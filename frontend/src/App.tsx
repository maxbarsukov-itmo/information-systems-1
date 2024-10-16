import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/DragonList';
import Login from './pages/Login';
import Register from './pages/Register';
import DragonList from './pages/DragonList';
import PrivateRoute from './components/PrivateRoute';
import Error from './pages/Error'; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dragons"
          element={
            <PrivateRoute>
              <DragonList />
            </PrivateRoute>
          }
        />
        <Route path=":code" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
