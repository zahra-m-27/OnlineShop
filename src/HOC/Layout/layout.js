import Wrapper from "../Wrapper/wrapper";
import classes from './layout.module.css';
import Toolbar from "../../Components/Navigation/Toolbar/toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/side-drawer";
import {Component} from "react";
import {connect} from "react-redux";

class Layout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    drawerToggleHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() {
        return (
            <Wrapper>
                <Toolbar
                    drawerToggleClicked={this.drawerToggleHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <main className={classes.mt}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);