import React, { Component, FC } from 'react'
import { IPizzaItem } from '../types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { useState, useEffect } from 'react';
import { changePizzaBasketSend, removePizzaFromBasket } from '../store/pizaSlice';
interface IPizzaItemBasketComponent{
    item: IPizzaItem
    index: number
}
const BasketItem: FC<IPizzaItemBasketComponent> = ({item, index}) => {
    const dispatch = useAppDispatch();
    const [sendData,setSendData] = useState({id: item.id, size: 'small', crust: 'cheesy'})
    const send = useAppSelector(state => state.pizza.basketSend)
    const toggleData = (e: React.ChangeEvent<HTMLSelectElement>, type:string) => {
            setSendData((prevState) => ({
                ...prevState, [type]: e.target.selectedOptions[0].value,
    
            }))  
    }
    const removeItem = (index:number) => {
        dispatch(removePizzaFromBasket(index))
    }
    useEffect(() => {
        dispatch(changePizzaBasketSend({item: {...sendData}, index:index}))
    }, [sendData])
    // console.log(Object.entries(item.price.crust).filter((item) => item[0] === sendData.crust )[0][1]);

    return ( 
        <div key={item.id} className='drop-shadow-lg p-4 rounded-md flex bg-slate-200 items-center mb-8	justify-between		'>
            <img className='mr-6' src={item.img} alt="" />
            <div className="info-block mr-6">
                <p className='info-title text-2xl'>{item.name}</p>
                <p className='info-price'>
                    {
                        item.price.default
                        + Object.entries(item.price.crust).filter((item) => item[0] === sendData.crust )[0][1]
                        + Object.entries(item.price.size).filter((item) => item[0] === sendData.size )[0][1]
                    }
                </p>
            </div>
            <div className="data-block">
                <div className="flex justify-center">
                                <div className="mb-3 w-72">
                                    <label htmlFor="exampleInputEmail2" className="htmlForm-label inline-block mb-2 text-gray-700">Борты пиццы</label>

                                    <select className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(e) => toggleData(e, 'crust')}>
                                        {
                                            
                                                Object.entries(item.price.crust).map(([key, value]) => <option   key={key}  value={key} >{key}</option>)
                                        }
                                    </select>
                                </div>
                </div>
                <div className="flex justify-center">
                                <div className="mb-3 w-72">
                                    <label htmlFor="exampleInputEmail2" className="htmlForm-label inline-block mb-2 text-gray-700">Размеры пиццы</label>

                                    <select className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(e) => toggleData(e, 'size')}  >
                                        {
                                            
                                            Object.entries(item.price.size).map(([key, value]) => <option   key={key}  value={key} >{key}</option>)
                                        }
                                    </select>
                                </div>
                </div>
            </div>
            <div className="remove-btn cursor-pointer w-fit" onClick={()=>removeItem(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
    </div>
     );
}
 
export default BasketItem;