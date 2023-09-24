import {Component} from "react";
import classes from "./food-ingredients.module.css";
import PropTypes from 'prop-types';

class FoodIngredients extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let ingredients = null;
        switch (this.props.type){
            case 'bread':
                ingredients = <div className={classes.bread}>Bread</div>
                break;
            case 'hotDog':
                ingredients = <div className={classes.hotDog}>Hot Dog</div>
                break;
            case 'cheese':
                ingredients = <div className={classes.cheese}>Cheese</div>
                break;
            case 'salad':
                ingredients = <div className={classes.salad}>Salad</div>
                break;
            default:
                ingredients = null;
        }
        return ingredients;
    }
}

FoodIngredients.propTypes = {
    type: PropTypes.string.isRequired
}

export default FoodIngredients;