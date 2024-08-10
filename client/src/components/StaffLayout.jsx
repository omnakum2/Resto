import React from "react";
import { Outlet } from 'react-router-dom';
import Header from './staff/Header';

function StaffLayout() {
  return (
    <div>
      <div>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default StaffLayout;
