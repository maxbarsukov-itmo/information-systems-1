import React from 'react';
import AdminInterface from './adminRequestPanel/AdminInterface';
import UserInterface from './adminRequestPanel/UserInterface';
import { useSelector } from 'react-redux';

const AdminRequestPanel = () => {
  const isAdmin = (): boolean => {  
    const user = useSelector((state: any) => state.user);
    return user?.role === 'admin';
  };

  return (
    <>
      {isAdmin() ? <AdminInterface /> : <UserInterface />}
    </>
  );
};

export default AdminRequestPanel;