import classes from './navigation-item.module.css';
import {NavLink} from "react-router-dom";

const NavigationItem = (props) => {
    return (
        <li className={classes.navigationItem}>
            <NavLink to={props.link} className={({isActive}) => isActive ? classes.active : null}>
                {props.children}
            </NavLink>
        </li>
    );
}

export default NavigationItem;