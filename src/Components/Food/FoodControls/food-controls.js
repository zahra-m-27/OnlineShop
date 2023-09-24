import Wrapper from "../../../HOC/Wrapper/wrapper";
import FoodControl from "../FoodControl/food-control";
import classes from './food-controls.module.css'
const controls = [
    {label:'HotDog', type:'hotDog'},
    {label:'Cheese', type:'cheese'},
    {label:'Salad', type:'salad'}
]

const FoodControls = (props) => {
    return (
        <Wrapper>
            <div className={classes.mainBackground}>
                <p className={classes.price}>Total Price: {props.price} $</p>
                {controls.map(ctrl => {
                    return (
                        <FoodControl
                            label={ctrl.label}
                            key={ctrl.type}
                            add={() => props.ingredientAdd(ctrl.type)}
                            remove={() => props.ingredientRemove(ctrl.type)}
                            disabled={props.disabled[ctrl.type]}
                        />
                    )
                })}
                <button
                    disabled={!props.purchasable}
                    className='btn btn-primary'
                    onClick={props.order}
                >
                    {props.isAuth ? 'Order' : 'Sign In To Order'}
                </button>
            </div>
        </Wrapper>
    );
}

export default FoodControls;