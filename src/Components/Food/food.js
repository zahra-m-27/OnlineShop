import FoodIngredients from "./FoodIngredients/food-ingredients";
import classes from './food.module.css';

const Food = (props) => {

    let transformIngredients = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_,i) => {
            return <FoodIngredients type={igkey} key={igkey + i} />
        })
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[])

    if(transformIngredients.length === 0){
        transformIngredients = <p className={classes.noIngredients}>Please choose your food ingredients!</p>
    }

    return (
        <div className='container'>
            <FoodIngredients type='bread' />
            {transformIngredients}
            <FoodIngredients type='bread' />
        </div>
    );
}

export default Food;