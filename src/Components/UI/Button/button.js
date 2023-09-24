const Button = (props) => {
    return (
        <button
            onClick={props.clicked}
            className={['btn', props.btnType].join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}

export default Button;