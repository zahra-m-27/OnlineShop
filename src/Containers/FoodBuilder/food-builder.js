import {Component} from "react";
import Wrapper from "../../HOC/Wrapper/wrapper";
import Food from "../../Components/Food/food";
import FoodControls from "../../Components/Food/FoodControls/food-controls";
import Modal from "../../Components/UI/Modal/modal";
import OrderSummery from "../../Components/Order/OrderSummery/order-summery";
import instance from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/spinner";
import errorHandler from "../../HOC/errorHandler/error-handler";
import withRouter from "../../HOC/withRouter/with-router";
import * as foodBuilderActions from '../../store/Actions/index'
import {connect} from "react-redux";

class FoodBuilder extends Component{

    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            isPurchasing: false,
            loading: false
        };

    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey]
        }).reduce((sum,el) => {
            return sum + el;
        }, 0);
        return sum>0;
    }

    purchaseHandler = (isOpen) => {
        if(isOpen){
            if(this.props.isAuthenticated)
                this.setState({isPurchasing:true})
            else
                this.props.navigate('/authentication')
        }
        else
            this.setState({isPurchasing: false})
    }

    componentDidMount() {
        console.log(this.props);
    }

    orderCheckout = () => {
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.props.price)
        // const queryString = queryParams.join('&');
        // this.props.navigate(`/checkout/${queryString}`);

        this.props.navigate('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }
        for(let key in disableInfo){
            // if(disableInfo[key] <= 0){
            //     disableInfo[key] = true;
            // }
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummery = <OrderSummery
                            ingredients={this.props.ings}
                            continueOrder={() => this.purchaseHandler(false)}
                            checkout={this.orderCheckout}
                           />
        if(this.state.loading){
            // orderSummery = <Navigate to='/checkout'/>
            orderSummery = <Spinner />
        }
        return (
            <Wrapper>
                <Modal show={this.state.isPurchasing} modalClosed={() => this.purchaseHandler(false)}>
                    {orderSummery}
                </Modal>
                <Food ingredients={this.props.ings}/>
                <FoodControls
                    ingredientAdd={this.props.onIngredientAdded}
                    ingredientRemove={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    order={() => this.purchaseHandler(true)}
                    isAuth={this.props.isAuthenticated}
                />
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.foodBuilder.ingredients,
        price: state.foodBuilder.totalPrice,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded : (ingName) => dispatch(foodBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(foodBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(errorHandler(FoodBuilder, instance)));