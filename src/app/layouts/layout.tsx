import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import HeaderComponent from '../components/Header';

const Layout: FC = () => {
    return (
        <div className="container">
            <HeaderComponent />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
