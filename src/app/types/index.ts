export interface IPizzaItem {
    classifications: {
        new: boolean,
        spicy: boolean,
        vegetarian: boolean,
    },
    id: number,
    img: string,
    ingredients: string[],
    name: string,
    price:{
        default: number,
        crust: {
            cheesy: number,
            cheesySausage: number,
        },
        size:{
            large: number,
            medium: number,
            small: number
        }
    }
}

export interface IPizzaItemBasket{
    
        id: number,
        size: string,
        crust: string
    
}