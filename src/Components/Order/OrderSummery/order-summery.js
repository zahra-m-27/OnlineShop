import Wrapper from "../../../HOC/Wrapper/wrapper";
import Button from "../../UI/Button/button";
import classes from './order-summery.module.css'
import {Component} from "react";

class OrderSummery extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Order Summery Updated')
    }

    render() {
        const ingredientsSummery = Object.keys(this.props.ingredients).map((igKey) => {
            return <li key={igKey}><span>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        })

        return (
            <Wrapper>
                <div className={classes.main}>
                    <h4><strong>Your order items</strong></h4>
                    <p style={{direction: 'ltr'}}>The sandwich you ordered includes the following:</p>
                    <ul>
                        {ingredientsSummery}
                    </ul>
                    <hr />
                    <p>Please choose one of the following buttons to continue</p>
                    <Button btnType='btn-success pull-right' clicked={this.props.checkout}>Checkout</Button>
                    <Button btnType='btn-warning' clicked={this.props.continueOrder}>Continue your order</Button>
                </div>
            </Wrapper>
        );
    }
}

export default OrderSummery;