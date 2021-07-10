import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import history from "../history";

import Auth from "../pages/auth";
import Home from "../pages/home";
import CertificateViewer from "../pages/viewer";

function RouteHandler(props){
    return (
        <Router history={history}>
            <Switch>
                <Route path="/profile" >
                    {props.isUserLoggedIn === true ? <Home /> : <Auth />}
                </Route>
                <Route path="/c/:certificateID" component={CertificateViewer} />
                <Route path="/" >
                    <Auth />
                </Route>
            </Switch>
        </Router>
    );
}

const mapStateToProps = (authReducer) => {
    const userState = authReducer.authReducer;
    return {
        isUserLoggedIn: typeof userState.user !== 'undefined',
        user: userState.user
    }
}

export default connect(mapStateToProps)(RouteHandler);