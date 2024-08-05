import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './user/Header';
import Footer from './user/Footer';

const UserLayout = () => {
  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;