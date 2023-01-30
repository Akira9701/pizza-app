export interface IPizzaItem {
    classifications: {
        new: boolean,
        spicy: boolean,
        vegetarian: boolean,
    },
    id: number,
    img: string,
    ingridients: string[],
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