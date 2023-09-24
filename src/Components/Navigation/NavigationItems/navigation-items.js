import classes from './navigation-items.module.css';
import NavigationItem from "./NavigationItem/navigation-item";

const NavigationItems = (props) => {
    return (
        <ul className={classes.navigationItems}>
            {!props.isAuth ?
                <NavigationItem link='/authentication'>Sign In</NavigationItem>
                :
                <NavigationItem link='/logout'>Log Out</NavigationItem>
            }
            <NavigationItem link='/'>Order</NavigationItem>
            <NavigationItem link='/checkout'>Checkout</NavigationItem>
        </ul>
    );
}

export default NavigationItems;