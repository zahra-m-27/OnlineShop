import * as actionTypes from '../Actions/action-types';
import {updateObject} from "../utility";

const initialState = {
    ingredients: {
        hotDog: 0,
        cheese: 0,
        salad: 0
    },
    totalPrice: 0
}

const INGREDIENT_PRICES = {
    hotDog: 20000,
    cheese: 10000,
    salad: 5000
}

const addIngredient = (state, action)=>{
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updateIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action)=>{
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients = updateObject(state.ingredients, updateIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}

const foodBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        default:
            return state;
    }
}

export default foodBuilderReducer;