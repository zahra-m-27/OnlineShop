import classes from './input.module.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = ['form-control', classes.main];
    if(props.invalid && props.shouldValidation && props.touched)
        inputClasses.push(classes.invalid)

    switch (props.elementType){
        case 'input':
            inputElement =
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            break;
        case 'textarea':
            inputElement =
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            break;
            case 'select':
                inputElement =
                    <select
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}
                    >
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
            break;
        default:
            inputElement =
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            break;
    }
    return (
        <div className='form-group text-left'>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;