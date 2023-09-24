import {Component} from "react";
import Input from "../../Components/UI/Input/input";
import Button from "../../Components/UI/Button/button";
import * as authActions from '../../store/Actions/auth-actions';
import {connect} from "react-redux";
import Spinner from "../../Components/UI/Spinner/spinner";
import {Navigate} from "react-router-dom";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls : {
                email: {
                    label: 'Email',
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    label: 'Password',
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'password'
                    },
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
            }
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
        if(rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler =(event) => {
        event.preventDefault();
        this.props.oAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render() {
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let errorMessage = null;
        let form = <form onSubmit={this.submitHandler}>
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
                    <Button btnType='btn-success pull-right'>Sign In</Button>
                </form>
        if(this.props.loading) {
            form = <Spinner />
        }
        if(this.props.error)
            errorMessage = <p>{this.props.error.message}</p>
        let authRedirect = null;
        if(this.props.isAuthenticated)
            authRedirect = <Navigate to="/" replace />

        return (
            <div className='container'>
                <div className='col-md-offset-3'>
                    {authRedirect}
                    {errorMessage}
                    {form}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        oAuth: (email, password) => dispatch(authActions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
