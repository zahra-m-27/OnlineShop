import classes from './food-control.module.css';

const FoodControl = (props) => {
    return (
        <div className='row'>
            <div className='col-sm-6 col-sm-offset-3'>
                <div className='form-group row'>
                    <div className='col-sm-6'>
                        <button className='btn btn-sm btn-success ml' onClick={props.add}>Add</button>
                        <button className='btn btn-sm btn-danger ml' onClick={props.remove} disabled={props.disabled}>Reduce</button>
                    </div>
                    <label className='col-sm-6 mt-5'>{props.label}</label>
                </div>
            </div>
        </div>
    );
}

export default FoodControl;