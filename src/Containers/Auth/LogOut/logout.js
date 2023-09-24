import {Component} from "react";
import {connect} from "react-redux";
import * as actions from '../../../store/Actions/index'
import withRouter from "../../../HOC/withRouter/with-router";
import {Navigate} from "react-router-dom";
class Logout extends Component{

    componentDidMount() {
        this.props.onLogOut();
    }

    render() {
        return (
         <Navigate to="/" state={{ from: this.props.location }} replace />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.authLogOut())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Logout))