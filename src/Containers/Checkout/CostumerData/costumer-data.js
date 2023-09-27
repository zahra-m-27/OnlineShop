import {Component} from "react";
import Button from "../../../Components/UI/Button/button";
import classes from './costumer-data.module.css'
import instance from "../../../axios-orders";
import withRouter from "../../../HOC/withRouter/with-router";
import Spinner from "../../../Components/UI/Spinner/spinner";
import Input from "../../../Components/UI/Input/input";
import {connect} from "react-redux";

class CostumerData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderForm: {
                name: {
                    label: 'Name',
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name'
                    },
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 10
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    label: 'Email',
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                address: {
                    label: 'Address',
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Address'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    label: 'Delivery Method',
                    elementType: 'select',
                    value: '',
                    elementConfig: {
                        options: [
                            {value:'priority', label: 'Send by priority mail'},
                            {value:'express', label: 'Send by express mail'}
                        ]
                    },
                    validation: {},
                    valid: true
                }
            },
            formIsValid: false,
            loading: false
        }
    }

    checkValidity(value, rules){
        let isValid = true;
        if (!rules) {
            return true;
        }
        if(rules.required)
            isValid = value.trim() !== '' && isValid;
        if(rules.minLength)
            isValid = value.length >= rules.minLength && isValid;
        if(rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            // ingredients: this.props.outletContext.ingredients,
            // price: this.props.outletContext.totalPrice,
            ingredients: this.props.ings,
            price: this.props.price,
            order: formData
        }

        instance.post('/posts', order).then(response => {
            this.props.navigate('/');
            console.log(response);
            this.setState({loading: false})
        }).catch(err => {
            console.log(err);
            this.setState({loading: false})
        })
        alert('Your order has been recorded successfully!');
    }

    inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputId]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render() {
        let mainClasses = ['container', classes.main];
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form className={classes.formOffset} onSubmit={this.orderHandler}>
                {formElementArray.map((formElement) => (
                    <Input
                        label={formElement.config.label}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        value={formElement.config.value}
                        elementConfig={formElement.config.elementConfig}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidation={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                ))}
                <Button btnType='btn-success pull-right' clicked={this.orderHandler} disabled={!this.state.formIsValid}>Checkout</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={mainClasses.join(' ')}>
                <h4 className='text-left'>Enter your information to finalize your order:</h4>
                <br/>
                <div className='row'>
                    <div>
                        {form}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.foodBuilder.ingredients,
        price: state.foodBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(withRouter(CostumerData));