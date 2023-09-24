import {Component} from "react";
import CheckoutSummery from "../../Components/Order/CheckoutSummery/checkout-summery";
import {Outlet} from "react-router-dom";
import withRouter from "../../HOC/withRouter/with-router";
import {connect} from "react-redux";

class Checkout extends Component{

    constructor(props) {
        super(props);
        this.props.location.pathname = '/checkout';
        this.props.location.search = '?' + this.props.params.ingredients;
    }

    finalCheckoutHandler = () => {
        this.props.navigate('/checkout/costumer-data', {replace: true});
    }

    cancelCheckoutHandler = () => {
        this.props.navigate(-1);
    }

    // UNSAFE_componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         } else{
    //             ingredients[[param[0]]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price})
    // }

    render() {
        return(
            <div>
                <CheckoutSummery
                    ingredients={this.props.ings}
                    finalCheckout={this.finalCheckoutHandler}
                    cancelCheckout={this.cancelCheckoutHandler}
                />
                <Outlet />
                {/*<Outlet context={{ingredients: [this.state.ingredients], totalPrice: this.state.totalPrice, ...this.props}}/>*/}
                {/*<Routes>*/}
                {/*    <Route path={this.props.location.pathname + '/costumer-data'} Component={CostumerData}/>*/}
                {/*</Routes>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.foodBuilder.ingredients
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));