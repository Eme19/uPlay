import React, {useContext} from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Spin } from 'antd';

const AdminRoute = ({ element }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (user && user.role === 'admin') {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
