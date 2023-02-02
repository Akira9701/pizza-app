import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { baseUrl, basketUrl } from '../constants/links';
import { useAppSelector } from '../hooks/reduxHooks';

const HeaderComponent: FC = () => {
    const count = useAppSelector((state) => state.pizza.basketDisplay);
    return (
        <header className="flex w-full items-center justify-between pt-8 pb-8">
            <div className="logo-wrap h-24 w-24">
                <img
                    className="h-full w-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/2048px-Dominos_pizza_logo.svg.png"
                    alt=""
                />
            </div>
            <nav>
                <ul className="items-center">
                    <li>
                        <NavLink
                            to={baseUrl}
                            className={({ isActive }) =>
                                (isActive ? 'text-sky-900 ' : 'text-black') +
                                ' font-montserrat	font-semibold'
                            }
                            end
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li className="flex items-center">
                        <NavLink
                            to={basketUrl}
                            className={({ isActive }) =>
                                (isActive ? 'text-sky-900 	' : 'text-black') +
                                ' font-montserrat font-semibold'
                            }
                        >
                            Корзина
                        </NavLink>
                        {!!count.length && (
                            <p className="ml-3 flex h-7 w-7 items-center justify-center rounded-md bg-sky-900 font-montserrat text-white">
                                {count.length}
                            </p>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderComponent;
