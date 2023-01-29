import React, { Component, FC } from 'react'
import { NavLink } from "react-router-dom";
const HeaderComponent:FC = () => {
    return ( 
        <header>
            <div className="logo-wrap">
                <p>SANTORIS</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'inactive')} end>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to='basket' className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Корзина</NavLink>
                    </li>
               
                </ul>
            </nav>
        </header>
    );
}
 
export default HeaderComponent;