import React, { Component, FC } from 'react'
import { NavLink } from "react-router-dom";
const HeaderComponent:FC = () => {
    return ( 
        <header className='w-full flex items-center justify-between pt-8 pb-8'>
            <div className="logo-wrap w-24 h-24">
                <img className='w-full h-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/2048px-Dominos_pizza_logo.svg.png" alt="" />
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className={({ isActive }) => ((isActive ? 'text-sky-900 ' : 'text-black') + " font-semibold	font-montserrat" ) } end>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to='basket' className={({ isActive }) => ((isActive ? 'text-sky-900 ' : 'text-black') + " font-semibold font-montserrat") } >Корзина</NavLink>
                    </li>
               
                </ul>
            </nav>
        </header>
    );
}
 
export default HeaderComponent;