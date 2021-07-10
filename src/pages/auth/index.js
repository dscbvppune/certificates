import { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { loginUser } from "../../actions/authHandler.action";
import { firebaseHandler, googleAuthProvider } from "../../config/firebase";

import "./auth.css";

class AuthHandler extends Component {

    handleGoogleLogin = () => {
        firebaseHandler.auth().signInWithPopup(googleAuthProvider).then((result) => {
            const credential = result.credential;
            const user = result.user;
            const userDetails = {
                name: user.displayName,
                email: user.email,
                isVerified: user.emailVerified,
                photo: user.photoURL
            };
            this.props.loginUser(userDetails);
            toast("Sign in successful");
        }).catch((error) => {
            toast.error("Uh oh, an error occurred");
            console.log(error);
        });
    }

    render(){
        return (
            <div className="auth-screen">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 certificates-title text-center">
                            <img src="https://res.cloudinary.com/startup-grind/image/upload/dpr_2.0,fl_sanitize/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_horizontal_097s7oa.svg" className="img-responsive" />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1 certificates-subtitle text-center">
                            Bharati Vidyapeeth Deemed University College of Engineering Pune
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 certificates-heading text-center">
                            Member Portal
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <center>
                                <div className="login-bttn" onClick={this.handleGoogleLogin}>
                                    <img className="img-responsive google-logo-img" height="24" width="24" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" /> Sign in with Google
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        loginUser: state => dispatch(loginUser(state))
    }
}

export default connect(null, mapDispatchToProps)(AuthHandler);