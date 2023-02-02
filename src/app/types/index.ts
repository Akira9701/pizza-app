export interface IPizzaItem {
    classifications: {
        new: boolean;
        spicy: boolean;
        vegetarian: boolean;
    };
    id: number;
    img: string;
    ingredients: string[];
    name: string;
    price: {
        default: number;
        crust: {
            cheesy: number;
            cheesySausage: number;
        };
        size: {
            large: number;
            medium: number;
            small: number;
        };
    };
}

export interface IPizzaItemBasket {
    id: number;
    size: string;
    crust: string;
}

export interface IErrors {
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

export interface IPizzaSend {
    id: number;
    crust: string;
    size: string;
}
