import React from 'react';
import AdminInterface from './adminRequestPanel/AdminInterface';
import UserInterface from './adminRequestPanel/UserInterface';
import { useSelector } from 'hooks';
import { Role } from 'interfaces/models/Role';

const AdminRequestPanel = () => {
  const isAdmin = (): boolean => {  
    const user = useSelector((store) => store.auth.user);
    return user?.role === Role.ROLE_ADMIN;
  };

  return (
    <>
      {isAdmin() ? <AdminInterface /> : <UserInterface />}
    </>
  );
};

export default AdminRequestPanel;