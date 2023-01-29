import React, { Component } from 'react'
import HeaderComponent from '../components/header'
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <div className='container'>
            <HeaderComponent />
            <main>
                <Outlet/>
            </main>
        </div>
    );
}
 
export default Layout;