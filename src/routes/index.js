import { Component } from "react";
import { connect } from "react-redux";

import Auth from "../pages/auth";
import Home from "../pages/home";

class RouteHandler extends Component {

    componentDidMount(){
        console.log(this.props);
    }

    render(){
        if(this.props.isUserLoggedIn === true){
            return <Home />;
        } else {
            return <Auth />;
        }
    }
}

const mapStateToProps = (userState) => {
    return {
        isUserLoggedIn: userState.user === null,
        user: userState.user
    }
}

export default connect(mapStateToProps)(RouteHandler);