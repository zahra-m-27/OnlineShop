import {Component} from "react";
import Wrapper from "../Wrapper/wrapper";
import Modal from "../../Components/UI/Modal/modal";

const errorHandler = (WrappedComponent, axios) =>{
    return class extends Component {
        state = {
            error: null
        }

        UNSAFE_componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({error: err})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorCloseHandler = () => {
            this.setState({error: null})
        }

        render() {
            return(
                <Wrapper>
                    <Modal show={this.state.error} modalClosed={this.errorCloseHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Wrapper>
            );
        }
    }
}

export default errorHandler;