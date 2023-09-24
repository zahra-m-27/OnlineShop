import './App.css';
import Layout from "./HOC/Layout/layout";
import FoodBuilder from "./Containers/FoodBuilder/food-builder";
import Checkout from "./Containers/Checkout/checkout";
import {Navigate, Route, Routes} from "react-router-dom";
import CostumerData from "./Containers/Checkout/CostumerData/costumer-data";
import Auth from "./Containers/Auth/auth";
import Logout from "./Containers/Auth/LogOut/logout";
import {connect} from "react-redux";
import {Component} from "react";

class App extends Component{
    render() {
        let routes =(
            <Routes>
                <Route path='/authentication' Component={Auth}/>
                <Route path='/' Component={FoodBuilder}/>
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        )
        if(this.props.isAuthenticated) {
            routes = (
                <Routes>
                    <Route path='/checkout/:ingredients/*' Component={Checkout}/>
                    <Route path='/authentication' Component={Auth}/>
                    <Route path='/logout' Component={Logout}/>
                    <Route path={'/checkout'} Component={Checkout}>
                        <Route path='/checkout/costumer-data' Component={CostumerData}/>
                    </Route>
                    <Route path='/' Component={FoodBuilder}/>
                </Routes>
            )
        }
        return (
            <div className="App">
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(App);
