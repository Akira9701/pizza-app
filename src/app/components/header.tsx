import React, { Component, FC } from 'react'
import { NavLink } from "react-router-dom";
const HeaderComponent:FC = () => {
    return ( 
        <header className='w-full flex items-center justify-between'>
            <div className="logo-wrap">
                <p>SANTORIS</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className={({ isActive }) => ((isActive ? 'text-cyan-300 underline	' : 'text-black') + " font-semibold	" ) } end>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to='basket' className={({ isActive }) => ((isActive ? 'text-cyan-300 underline	' : 'text-black') + " font-semibold") } >Корзина</NavLink>
                    </li>
               
                </ul>
            </nav>
        </header>
    );
}
 
export default HeaderComponent;