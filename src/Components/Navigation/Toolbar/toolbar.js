import Wrapper from "../../../HOC/Wrapper/wrapper";
import classes from './toolbar.module.css';
import logo from '../../../Assets/images/SiteLogo.png'
import NavigationItems from "../NavigationItems/navigation-items";
import DrawerToggle from "../SideDrawer/DrawerToggle/drawer-toggle";

const Toolbar = (props) => {
    return (
        <Wrapper>
            <header className={classes.toolbar}>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
                <img src={logo} className={[classes.DesktopOnly, classes.logo].join(' ')} alt='Site Logo'/>
                <div className={classes.MobileOnly}>
                    <DrawerToggle clicked={props.drawerToggleClicked}/>
                </div>
            </header>
        </Wrapper>
    );
}

export default Toolbar;