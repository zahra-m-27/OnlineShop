import {useNavigate, useParams, useLocation, useOutletContext, /* other hooks */} from 'react-router-dom';

const withRouter = WrappedComponent => props => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const outletContext = useOutletContext();
    // other hooks

    return (
        <WrappedComponent
            {...props}
            {...{ navigate, params, location, outletContext, /* other hooks */ }}
        />
    );
};

export default withRouter;