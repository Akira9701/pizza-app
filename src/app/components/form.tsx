import React, { FC, MouseEvent, useState, useEffect} from 'react'
import { IPizzaItem } from '../types/index';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import TextField from './textField';
import axios from 'axios';
import { clearBasket } from '../store/pizaSlice';

interface Element extends MouseEvent<HTMLDivElement> {
    target: HTMLDivElement
}



interface IPizzaCrust extends IPizzaItem{
    cheesy: number
    cheesySausage: number
}





interface ErrorsCurent{
    name: string;
    surname: string;
    patronymic: string;
    city: string;
    street: string;
    home: string;
    room: string;
    message: string;
    birthday: string;
    registration: string;
}

interface DataCurent{
    name: string;
    surname: string;
    patronymic: string;
    city: string;
    street: string;
    home: string;
    room: string;
    message: string;
    birthday: string;
    registration: string;
    size: string,
    crust: string,
    price: number
}

interface IFormStatus {
    side: string
}

const Form: FC<IFormStatus> = ({side}) => {
    const pizza:IPizzaItem = useAppSelector(state => state.pizza.order);
    const toggleForm = (e:Element) => {
        if(e.target.classList.contains('form-container')) e.target.classList.add('hidden');
    }
    const sendPizzas = useAppSelector(state=>state.pizza.basketSend);
    const displayPizzas = useAppSelector(state=>state.pizza.basketDisplay);
    const dispatch = useAppDispatch();

    const [selectedPizza, setSelectedPiza] = useState('');
    const [data, setData] = useState({name: "", surname: "", patronymic: "" , city: "", street: "", home: "", room: "", message: "", birthday: "", registration: "", comment: "", size:"large", crust: "cheesy", price: pizza.price.default,});
    const [errors, setErrors] = useState({name: "", surname: "", patronymic: "", city: "", street: "", home: "", room: "", message: "",  birthday: "", registration: ""});
    const validatorConfig = {
        name: {isRequired: {message: "Обязательное Поле Имя не заполнено"}, min : {message: "Символов должно быть больше 2", value: 2}, max : {message: "Символов должно быть меньше 32", value: 32}},
        surname: {isRequired: {message: "Поле Фамилия не заполнено"},  min : {message: "Символов должно быть больше 2" , value: 2}, max : {message: "Символов должно быть меньше 32", value: 32}},
        patronymic: { min : {message: "Символов должно быть больше 2", value: 2}, max : {message: "Символов должно быть меньше 32", value: 32}},
        birthday: {isRequired: {message: "Дата рождения не указана"}, isOlder: {message: "Вам меньше 18"}},
        city: {isRequired: {message: "Обязательное Поле Город не заполнено"},  min : {message: "Символов должно быть больше 2", value: 2}, max : {message: "Символов должно быть меньше 50", value: 50} },
        street: {isRequired: {message: "Обязательное Поле Улица не заполнено"},  min : {message: "Символов должно быть больше 2", value: 2}, max : {message: "Символов должно быть меньше 60", value: 60}},
        home: {isRequired: {message: "Обязательное Поле Дом не заполнено"},  min : {message: "Символов должно быть больше 1", value: 1}, max : {message: "Символов должно быть меньше 10", value: 10}},
        room: {isRequired: {message: "Обязательное Поле Квартира не заполнено"},  min : {message: "Символов должно быть больше 1", value: 1}, max : {message: "Символов должно быть меньше 10", value: 10}},
        registration: { min : {message: "Символов должно быть больше 2", value: 2}, max : {message: "Символов должно быть меньше 50", value: 50}},        
    }
    const handleValidation = (data:any , validatorConfig:any):boolean => {
        
        let errorsCurent = {...errors};
        let status = true;
        for (const key in data) {
            for(const danger in validatorConfig[key]){
                let stop = false
                switch(danger){
                    case 'isRequired':{
                        console.log(1)
                        data[key].length === 0 ? (errorsCurent[key as keyof ErrorsCurent] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key as keyof ErrorsCurent] = ""
                        break
                        
                    }
                    case 'min':{

                        data[key].length < validatorConfig[key][danger].value && data[key].length !== 0 ? (errorsCurent[key as keyof ErrorsCurent] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key as keyof ErrorsCurent] = ""
                        break

                    }
                    case 'max':{

                        data[key].length > validatorConfig[key][danger].value && data[key].length !== 0 ? (errorsCurent[key as keyof ErrorsCurent] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key as keyof ErrorsCurent] = ""
                        break

                    }
                    case 'isOlder':{
                        (new Date().getFullYear() - new Date(data[key]).getFullYear()) < 18 ? (errorsCurent[key as keyof ErrorsCurent] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key as keyof ErrorsCurent] = ""
                        break

                    }
                    case 'isBadSymbol':{
                        const isBadSymbol = /;/g;
                        isBadSymbol.test(data[key]) ? (errorsCurent[key as keyof ErrorsCurent] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key as keyof ErrorsCurent] = ""
                        break
                        
                    }
                    
                }
                if(stop){
                    break;
                }
              

            }
            continue
        }
        console.log(errorsCurent);
        setErrors(errorsCurent);
        return status;
        
    }
    function handleChange(e:  React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>):void {
        setData((prevState) => ({
            ...prevState, [e.target.name]:e.target.value,
        }))
    }
    const handleSubmit = (e:React.SyntheticEvent) => {
        console.log(sendPizzas[0]);
 
        e.preventDefault();
        if(handleValidation(data, validatorConfig)){
            axios.post('https://shift-winter-2023-backend.onrender.com/api/pizza/createOrder', {
                pizzas: [...sendPizzas],
                details:{
                    user: {
                        firstname: data.name,
                        lastName: data.surname,
                        birthDay: data.birthday,
                        registrationAddress: data.registration,
                    },
                    address: {
                        city: data.city,
                        street: data.street,
                        house: data.home,
                        apartment: data.home,
                        comment: data.comment
                    }
                },

            }).then(function (response) {
                alert("Заказ отправлен");
                console.log(response.data.order);
                dispatch(clearBasket({}));
                const formContainer = document.querySelector('.form-container');
                formContainer?.classList.toggle('hidden')
              })
              .catch(function (error) {
                alert("Что-то пошло не так, повторите попытку позже");
                console.log(error);
              });

        }
    }
    useEffect(() => {
        const names = displayPizzas.map((item) => item.name).join();
        console.log(names);
        setSelectedPiza(names);
        setData((prevState) => ({
            ...prevState, price:pizza.price.default
            + Number(Object.entries(pizza.price.crust).filter((item) => item[0] === data.crust )[0][1])
            + Number(Object.entries(pizza.price.size).filter((item) => item[0] === data.size )[0][1])
            ,
        }))
        
        
    }, [pizza])


    const formAny = () => {
        return (
            <>
            <div className="flex justify-center">
                <div className="mb-8 w-72">
                    <label htmlFor="exampleInputEmail2" className="htmlForm-label inline-block mb-2 text-gray-700">Размер пиццы</label>

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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(e) =>{
                        console.log(e.target.selectedOptions[0].value)
                        setData((prevState) => ({
                            ...prevState, size: e.target.selectedOptions[0].value, price: pizza.price.default 
                            + Number(Object.entries(pizza.price.size).filter((item) => item[0] === e.target.selectedOptions[0].textContent )[0][1])
                            + Number(Object.entries(pizza.price.crust).filter((item) => item[0] === data.crust )[0][1])
                        }))
                    }}>
                        {
                            
                            Object.entries(pizza.price.size).map(([key, value]) => <option key={key}  value={key}>{key}</option>)
                        }
                    </select>
                </div>
                </div>
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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(e) =>{
                        console.log(e.target.selectedOptions[0].textContent);
                        console.log()
                        setData((prevState) => ({
                            ...prevState, crust: e.target.selectedOptions[0].value, price: pizza.price.default 
                            + Number(Object.entries(pizza.price.crust).filter((item) => item[0] === e.target.selectedOptions[0].textContent )[0][1])
                            + (Number(Object.entries(pizza.price.size).filter((item) => item[0] === data.size )[0][1]))
                        }))
                    }}>
                        {/* <option value="none">default</option> */}
                        {
                            
                            Object.entries(pizza.price.crust).map(([key, value]) => <option   key={key}  value={key} >{key}</option>)
                        }
                    </select>
                </div>
            </div>
            </>

        )
    }

    return ( 
        <div className="form-container hidden  fixed w-full h-full top-0 left-0 bg-black/[0.8]	flex items-center justify-center" onClick={toggleForm} >
            <div className="block p-6 rounded-lg shadow-lg bg-white ">
            <form onSubmit={handleSubmit}>
                <div className="field-wrap flex">
                    <div className="form-data mr-3">
                        <TextField error={errors.name} value={data.name} type="name" name="name" title="Ваше имя" onChange={handleChange} />
                        <TextField error={errors.surname} value={data.surname} type="text" name="surname" title="Ваша фамилия" onChange={handleChange} />
                        <TextField error={errors.patronymic} value={data.patronymic} type="text" name="patronymic" title="Ваше отчество" onChange={handleChange} readonly={data.patronymic === "Отсутствует" ? true : false} />
                        <div className="flex justify-between items-center mb-6">
                            <div className="htmlForm-group htmlForm-check">
                                <input type="checkbox"
                                className="htmlForm-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                id="exampleCheck2" onChange={(e) => {
                                    console.log()
                                    setData((prevState) => ({...prevState, patronymic: e.target.checked ? "Отсутствует" : ""}));
                                }}/>
                                <label className="htmlForm-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Нету отчества</label>
                            </div>

                        </div>
                        <TextField error={errors.birthday} value={data.birthday} type="date" name="birthday" title="Дата рождения" onChange={handleChange} />
                        <TextField error={errors.registration} value={data.registration} type="text" name="registration" title="Адресс регистрации" onChange={handleChange} />

                    </div>
                    <div className="form-adress mr-3">
                        <TextField error={errors.city} value={data.city} type="text" name='city' title='Ваш город' onChange={handleChange} />
                        <TextField error={errors.street} value={data.street} type="text" name='street' title='Улица' onChange={handleChange} />
                        <TextField error={errors.home} value={data.home} type="text" name='home' title='Дом' onChange={handleChange} />
                        <TextField error={errors.room} value={data.room} type="text" name='room' title='Квартира' onChange={handleChange} />

           

                    </div>
                    <div className="pizza-wrap">
                        <div className="htmlForm-group mb-2  w-72 h-24	">
                            <label htmlFor="exampleInputEmail2" className="htmlForm-label inline-block mb-2 text-gray-700">Ваша пицца</label>
                            <input type="text" className="htmlForm-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
                            aria-describedby="emailHelp" placeholder="Enter email" value={selectedPizza} readOnly={true}
                            />
                        </div>
                        <div>
                            <div className="mb-3 ">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700"
                                >Сообщение курьеру
                                </label>
                                <textarea
                                className="
                                    h-144
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="exampleFormControlTextarea1"
                                placeholder="Текст...."
                                name='comment'
                                onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>

                        {side !== "basket" && formAny()}
                        
                </div>
                </div>
             

                <p className='price mb-4 text-2xl'>{data.price} руб. к оплате</p>
                <button type="submit" className="
                w-full
                px-6
                py-2.5
                bg-yellow-500
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-yellow-600 hover:shadow-lg
                focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-yellow-500 active:shadow-lg
                transition
                duration-150
                ease-in-out" >Заказать пиццу</button>

            </form>
            </div>
        </div>    
    );
}
 
export default Form;