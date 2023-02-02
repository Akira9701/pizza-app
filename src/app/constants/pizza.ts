export const BasePizza = {
    classifications: {
        new: true,
        spicy: false,
        vegetarian: false
    },
    id: 0,
    img: '',
    ingredients: [],
    name: '',
    price: {
        default: 0,
        crust: {
            cheesy: 0,
            cheesySausage: 0
        },
        size: {
            large: 0,
            medium: 0,
            small: 0
        }
    }
};
