import { Component } from "react";
import { connect } from "react-redux";

import Auth from "../pages/auth";
import Home from "../pages/home";

function RouteHandler(props){
    console.log("Route Handler Props", props);
    if(props.isUserLoggedIn === true){
        return <Home />;
    } else {
        return <Auth />;
    }
}

const mapStateToProps = (authReducer) => {
    const userState = authReducer.authReducer;
    return {
        isUserLoggedIn: typeof userState.user !== 'undefined',
        user: userState.user
    }
}

export default connect(mapStateToProps)(RouteHandler);