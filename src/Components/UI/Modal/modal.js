import classes from './modal.module.css';
import Wrapper from "../../../HOC/Wrapper/wrapper";
import Backdrop from "../Backdrop/backdrop";
import {Component} from "react";

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    }

    render() {
        return (
            <Wrapper>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.modal}
                     style={{
                         opacity: this.props.show ? '1' : '0',
                         transform: this.props.show ? 'translateX(-50%)' : 'translateX(-10%)',
                         zIndex: this.props.show ? '999' : '-100'
                     }}
                >
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}

export default Modal;