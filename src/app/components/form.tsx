import axios from 'axios';
import React, { FC, MouseEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { changePizzaBasketSend, clearBasket } from '../store/pizaSlice';
import { IPizzaItem, IPizzaSend } from '../types/index';
import { handleValidation } from '../utils/validation';

import FormSelects from './FormSelects';
import TextField from './TextField';

import { instance } from '../utils/axios';

interface Element extends MouseEvent<HTMLDivElement> {
    target: HTMLDivElement;
}
interface IFormStatus {
    side: string;
}

const errorsConfig = {
    name: '',
    surname: '',
    patronymic: '',
    city: '',
    street: '',
    home: '',
    room: '',
    message: '',
    birthday: '',
    registration: ''
};

const baseDataCofig = {
    name: '',
    surname: '',
    patronymic: '',
    city: '',
    street: '',
    home: '',
    room: '',
    message: '',
    birthday: '',
    registration: '',
    comment: '',
    size: 'small',
    crust: 'cheesy',
    price: 0
};

const validatorConfig = {
    name: {
        isRequired: { message: 'Обязательное Поле Имя не заполнено' },
        min: { message: 'Символов должно быть больше 2', value: 2 },
        max: { message: 'Символов должно быть меньше 32', value: 32 }
    },
    surname: {
        isRequired: { message: 'Поле Фамилия не заполнено' },
        min: { message: 'Символов должно быть больше 2', value: 2 },
        max: { message: 'Символов должно быть меньше 32', value: 32 }
    },
    patronymic: {
        min: { message: 'Символов должно быть больше 2', value: 2 },
        max: { message: 'Символов должно быть меньше 32', value: 32 }
    },
    birthday: {
        isRequired: { message: 'Дата рождения не указана' },
        isOlder: { message: 'Вам меньше 18' }
    },
    city: {
        isRequired: { message: 'Обязательное Поле Город не заполнено' },
        min: { message: 'Символов должно быть больше 2', value: 2 },
        max: { message: 'Символов должно быть меньше 50', value: 50 }
    },
    street: {
        isRequired: { message: 'Обязательное Поле Улица не заполнено' },
        min: { message: 'Символов должно быть больше 2', value: 2 },
        max: { message: 'Символов должно быть меньше 60', value: 60 }
    },
    home: {
        isRequired: { message: 'Обязательное Поле Дом не заполнено' },
        min: { message: 'Символов должно быть больше 1', value: 1 },
        max: { message: 'Символов должно быть меньше 10', value: 10 }
    },
    room: {
        isRequired: { message: 'Обязательное Поле Квартира не заполнено' },
        min: { message: 'Символов должно быть больше 1', value: 1 },
        max: { message: 'Символов должно быть меньше 10', value: 10 }
    },
    registration: {
        min: { message: 'Символов должно быть больше 2', value: 2 },
        max: { message: 'Символов должно быть меньше 50', value: 50 }
    }
};

const Form: FC<IFormStatus> = ({ side }) => {
    const dispatch = useAppDispatch();
    const pizza: IPizzaItem = useAppSelector((state) => state.pizza.basketDisplay[0]);
    const toggleForm = (e: Element): void => {
        if (e.target.classList.contains('form-container')) e.target.classList.add('hidden');
    };
    const sendPizzas = useAppSelector((state) => state.pizza.basketSend);
    const displayPizzas = useAppSelector((state) => state.pizza.basketDisplay);
    const [data, setData] = useState(baseDataCofig);
    const [errors, setErrors] = useState(errorsConfig);
    function handleChangeInfoPerson(
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ): void {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        // const changeItem = (el: object): void => {
        //     console.log(el);
        //     dispatch(changePizzaBasketSend(el));
        // };
    }
    const hanleChangeAlonePizza = (key: string, value: string): void => {
        const item: IPizzaSend = { ...sendPizzas[0] };
        item[key as keyof IPizzaSend] = value;
        dispatch(changePizzaBasketSend({ item: { ...item }, index: 0 }));
    };
    const handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        if (handleValidation(data, validatorConfig, errors, setErrors)) {
            instance
                .post('/createOrder', {
                    pizzas: [...sendPizzas],
                    details: {
                        user: {
                            firstname: data.name,
                            lastName: data.surname,
                            birthDay: data.birthday,
                            registrationAddress: data.registration
                        },
                        address: {
                            city: data.city,
                            street: data.street,
                            house: data.home,
                            apartment: data.home,
                            comment: data.comment
                        }
                    }
                })
                .then(function (response) {
                    alert('Заказ отправлен');
                    console.log(response.data.order);
                    dispatch(clearBasket({}));
                    const formContainer = document.querySelector('.form-container');
                    formContainer?.classList.toggle('hidden');
                })
                .catch(function (error) {
                    alert('Что-то пошло не так, повторите попытку позже');
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (!!sendPizzas.length) {
            setData((prevState) => ({
                ...prevState,
                price:
                    displayPizzas[0].price.default +
                    Number(
                        Object.entries(pizza.price.crust).filter(
                            (item) => item[0] === data.crust
                        )[0][1]
                    ) +
                    Number(
                        Object.entries(pizza.price.size).filter(
                            (item) => item[0] === data.size
                        )[0][1]
                    )
            }));
        }
    }, [sendPizzas]);

    return (
        <div
            className="form-container fixed  top-0 left-0 flex hidden h-full w-full	items-center justify-center bg-black/[0.8]"
            onClick={toggleForm}
        >
            <div className="block rounded-lg bg-white p-6 shadow-lg ">
                <form onSubmit={handleSubmit}>
                    <div className="field-wrap flex">
                        <div className="form-data mr-3">
                            <TextField
                                error={errors.name}
                                value={data.name}
                                type="name"
                                name="name"
                                title="Ваше имя"
                                onChange={handleChangeInfoPerson}
                            />
                            <TextField
                                error={errors.surname}
                                value={data.surname}
                                type="text"
                                name="surname"
                                title="Ваша фамилия"
                                onChange={handleChangeInfoPerson}
                            />
                            <TextField
                                error={errors.patronymic}
                                value={data.patronymic}
                                type="text"
                                name="patronymic"
                                title="Ваше отчество"
                                onChange={handleChangeInfoPerson}
                                readonly={data.patronymic === 'Отсутствует' ? true : false}
                            />
                            <div className="mb-6 flex items-center justify-between">
                                <div className="htmlForm-group htmlForm-check">
                                    <input
                                        type="checkbox"
                                        className="htmlForm-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none
                                        rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top
                                        transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                                        id="exampleCheck2"
                                        onChange={(e) => {
                                            setData((prevState) => ({
                                                ...prevState,
                                                patronymic: e.target.checked ? 'Отсутствует' : ''
                                            }));
                                        }}
                                    />
                                    <label
                                        className="htmlForm-check-label inline-block text-gray-800"
                                        htmlFor="exampleCheck2"
                                    >
                                        Нету отчества
                                    </label>
                                </div>
                            </div>
                            <TextField
                                error={errors.birthday}
                                value={data.birthday}
                                type="date"
                                name="birthday"
                                title="Дата рождения"
                                onChange={handleChangeInfoPerson}
                            />
                            <TextField
                                error={errors.registration}
                                value={data.registration}
                                type="text"
                                name="registration"
                                title="Адресс регистрации"
                                onChange={handleChangeInfoPerson}
                            />
                        </div>
                        <div className="form-adress mr-3">
                            <TextField
                                error={errors.city}
                                value={data.city}
                                type="text"
                                name="city"
                                title="Ваш город"
                                onChange={handleChangeInfoPerson}
                            />
                            <TextField
                                error={errors.street}
                                value={data.street}
                                type="text"
                                name="street"
                                title="Улица"
                                onChange={handleChangeInfoPerson}
                            />
                            <TextField
                                error={errors.home}
                                value={data.home}
                                type="text"
                                name="home"
                                title="Дом"
                                onChange={handleChangeInfoPerson}
                            />
                            <TextField
                                error={errors.room}
                                value={data.room}
                                type="text"
                                name="room"
                                title="Квартира"
                                onChange={handleChangeInfoPerson}
                            />
                        </div>
                        <div className="pizza-wrap">
                            <div className="htmlForm-group mb-2  h-24 w-72	">
                                <label
                                    htmlFor="exampleInputEmail2"
                                    className="htmlForm-label mb-2 inline-block text-gray-700"
                                >
                                    Ваша пицца
                                </label>
                                <input
                                    type="text"
                                    className="htmlForm-control m-0 block w-full rounded border  border-solid  border-gray-300 bg-white
                                    bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out
                                    focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                                    id="exampleInputEmail2"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={displayPizzas.map((item) => item.name).join()}
                                    readOnly={true}
                                />
                            </div>
                            <div>
                                <div className="mb-3 ">
                                    <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="form-label mb-2 inline-block text-gray-700"
                                    >
                                        Сообщение курьеру
                                    </label>
                                    <textarea
                                        className=" h-144 form-control m-0 block w-full rounded border border-solid border-gray-300
                                        bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out
                                        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
                                "
                                        id="exampleFormControlTextarea1"
                                        placeholder="Текст...."
                                        name="comment"
                                        onChange={handleChangeInfoPerson}
                                    ></textarea>
                                </div>
                            </div>

                            {side !== 'basket' && pizza !== undefined && (
                                <FormSelects
                                    data={data}
                                    setData={setData}
                                    pizza={pizza}
                                    hanleChangeAlonePizza={hanleChangeAlonePizza}
                                />
                            )}
                        </div>
                    </div>

                    <p className="price mb-4 text-2xl">
                        {side !== 'basket'
                            ? data.price
                            : displayPizzas.reduce(function (currentSum, currentItem, index) {
                                  return (
                                      currentSum +
                                      currentItem.price.default +
                                      Object.entries(currentItem.price.crust).filter(
                                          (item) => item[0] === sendPizzas[index].crust
                                      )[0][1] +
                                      Object.entries(currentItem.price.size).filter(
                                          (item) => item[0] === sendPizzas[index].size
                                      )[0][1]
                                  );
                              }, 0)}{' '}
                        руб. к оплате
                    </p>
                    <button
                        type="submit"
                        className="  w-full  rounded  bg-sky-800  px-6  py-2.5  font-montserrat  text-xs  font-medium  uppercase  leading-tight 
                        text-white  shadow-md  transition duration-150  ease-in-out hover:bg-sky-900 hover:shadow-lg focus:bg-sky-900 
                        focus:shadow-lg focus:outline-none  focus:ring-0  active:bg-sky-900  active:shadow-lg"
                    >
                        Заказать пиццу
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
