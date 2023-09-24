import classes from './side-drawer.module.css';
import Backdrop from "../../UI/Backdrop/backdrop";
import logo from "../../../Assets/images/SiteLogo.png";
import NavigationItems from "../NavigationItems/navigation-items";
import Wrapper from "../../../HOC/Wrapper/wrapper";

const SideDrawer = (props) => {

    let attachedClasses = [classes.sideDrawer, classes.close];
    if(props.open){
        attachedClasses = [classes.sideDrawer, classes.open]
    }

    return (
        <Wrapper>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <img src={logo} className={classes.logo} alt='Site Logo'/>
                <nav className={classes.navLinks}>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Wrapper>
    );
}

export default SideDrawer;