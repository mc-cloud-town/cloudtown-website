import NavigationBar from '#/common/NavigationBar';
import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6f9b9c',
          colorInfo: '#96dbe6',
          colorSuccess: '#b1dde6',
          colorWarning: '#fadb14',
          colorError: '#f5222d',

          // Alias Token
          colorBgContainer: '#ffffff',
          colorTextBase: '#333333',
          borderRadius: 4,

          colorLink: '#6f9b9c',
          colorBorder: '#96dbe6',
        },
      }}
    >
      <NavigationBar />
      <Outlet />
    </ConfigProvider>
  );
};