import React, { FC, MouseEvent, useState, useEffect} from 'react'
import { IPizzaItem } from '../types/index';
import { useAppSelector } from '../hooks/reduxHooks'
import TextField from './textField';
import axios from 'axios';

interface Element extends MouseEvent<HTMLDivElement> {
    target: HTMLDivElement
}


interface IConfigItem{
    email: {
        isRequired: {
            message: string,
        },
        isEmail:{
            message: string
        }
    }

}

// interface ItemsList {
//     items: IPizzaItem[]
// }

const Form: FC = () => {
    const pizza = useAppSelector(state => state.pizza.order);
    const toggleForm = (e:Element) => {
        if(e.target.classList.contains('form-container')) e.target.classList.add('hidden');
    }
    const [selectedPizza, setSelectedPiza] = useState('');
    const [data, setData] = useState({name: "", surname: "", patronymic: "", city: "", street: "", home: "", room: "", message: "", birthday: ""});
    const [errors, setErrors] = useState({name: "", surname: "", patronymic: "", city: "", street: "", home: "", room: "", message: "",  birthday: ""});
    const validatorConfig = {
        name: {isRequired: {message: "Обязательное Поле Имя не заполнено"}, min : {message: "Символов должно быть больше 2", value: 2}, max : {message: "Символов должно быть меньше 32", value: 32}},
        surname: {isRequired: {message: "Поле Фамилия не заполнено"},  min : {message: "Символов должно быть больше 2" , value: 2}, max : {message: "Символов должно быть меньше 32", value: 32}},
        patronymic: {isRequired: {message: "Поле Отчетсво не заполнено"},  min : {message: "Символов должно быть больше 2", }, max : {message: "Символов должно быть меньше 32", value: 32}},
        birthday: {isRequired: {message: "Дата рождения не указана"}, isOlder: {message: "Вам меньше 18"}},
        city: {isRequired: {message: "Обязательное Поле Город не заполнено"}},
        street: {isRequired: {message: "Обязательное Поле Улица не заполнено"}},
        home: {isRequired: {message: "Обязательное Поле Дом не заполнено"}},
        // room: {isRequired: {message: "Поле Квартира не заполнено"}},
        
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
                        data[key].length === 0 ? (errorsCurent[key] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key] = ""
                        break
                        
                    }
                    case 'min':{

                        data[key].length < 3 ? (errorsCurent[key] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key] = ""
                        break

                    }
                    case 'max':{

                        data[key].length > 32 ? (errorsCurent[key] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key] = ""
                        break

                    }
                    case 'isOlder':{
                        (new Date().getFullYear() - new Date(data[key]).getFullYear()) < 18 ? (errorsCurent[key] = validatorConfig[key][danger].message, status = false, stop = true) : errorsCurent[key] = ""
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        console.log();
        setData((prevState) => ({
            ...prevState, [e.target.name]:e.target.value,
        }))
        console.log(data);
    }
    const handleSubmit = (e:React.SyntheticEvent) => { 
        e.preventDefault();
        if(handleValidation(data, validatorConfig)){
            axios.post('dsadasd', {
                pizzas: [
                    selectedPizza
                ]
            })
            alert("Заказ отправлен");
            const formContainer = document.querySelector('.form-container');
            formContainer?.classList.toggle('hidden')
        }
    }



    
    useEffect(() => {
        setSelectedPiza(pizza.name)
    }, [pizza])
    return ( 
        <div className="form-container hidden  fixed w-full h-full top-0 left-0 bg-black/[0.8]	flex items-center justify-center" onClick={(e:Element) => toggleForm(e)}>
            <div className="block p-6 rounded-lg shadow-lg bg-white ">
            <form onSubmit={handleSubmit}>
                <div className="field-wrap flex">
                    <div className="form-data mr-3">
                        <TextField error={errors.name} value={data.name} type="name" name="name" title="Ваше имя" onChange={handleChange} />
                        <TextField error={errors.surname} value={data.surname} type="text" name="surname" title="Ваша фамилия" onChange={handleChange} />
                        <TextField error={errors.patronymic} value={data.patronymic} type="text" name="patronymic" title="Ваше отчество" onChange={handleChange} />
                        <TextField error={errors.birthday} value={data.birthday} type="date" name="birthday" title="Дата рождения" onChange={handleChange} />
                        <div className="htmlForm-group mb-6  w-72">
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
                            aria-describedby="emailHelp" placeholder="Enter email" value={selectedPizza} defaultValue="Пицца" onChange={() => {

                            }}
        />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <div className="htmlForm-group htmlForm-check">
                                <input type="checkbox"
                                className="htmlForm-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                id="exampleCheck2" />
                                <label className="htmlForm-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
                            </div>

                        </div>
                    </div>
                    <div className="form-adress">
                        <TextField error={errors.city} value={data.city} type="text" name='city' title='Ваш город' onChange={handleChange} />
                        <TextField error={errors.street} value={data.street} type="text" name='street' title='Улица' onChange={handleChange} />
                        <TextField error={errors.home} value={data.home} type="text" name='home' title='Дом' onChange={handleChange} />
                        <TextField error={errors.room} value={data.room} type="text" name='room' title='Квартира' onChange={handleChange} />
                        <div className="">
                            <div className="mb-3 ">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700"
                                >Example textarea</label
                                >
                                <textarea
                                class="
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
                                rows="3"
                                placeholder="Your message"
                                ></textarea>
                            </div>
                        </div>
           

                    </div>
                </div>

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