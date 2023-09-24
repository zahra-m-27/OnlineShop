import classes from './checkout-summery.module.css';
import Food from "../../Food/food";
import Button from "../../UI/Button/button";

const CheckoutSummery = (props) => {
    return (
            <div className={classes.main}>
                <h3>Your order is as follows. Hope you enjoy it!</h3>
                <div>
                    <Food ingredients={props.ingredients}/>
                </div>
                <div className={classes.buttons}>
                    <Button btnType='btn-danger' clicked={props.cancelCheckout}>Cancel</Button>
                    <Button btnType='btn-success pull-right' clicked={props.finalCheckout}>Submit Information</Button>
                </div>
            </div>
    );
}

export default CheckoutSummery;