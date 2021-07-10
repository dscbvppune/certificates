import { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import history from "../../history";

import { logoutUser } from "../../actions/authHandler.action";
import { firebaseHandler} from "../../config/firebase";
import "./Home.css";

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            firestoreUserDetails: {}
        };
    }

    handleLogout = () => {
        firebaseHandler.auth().signOut().then(() => {
            toast("Sign out successful");
            this.props.logoutUser(undefined);
            history.push("/");
        }).catch((error) => {
            toast.error("A warning occurred");
        })
    }

    fetchUserDataFromFirestore = async (email) => {
        const querySnapshot = await firebaseHandler.firestore().collection("members").where("email", "==", email).get();
        const userData = querySnapshot.docs[0];
        this.setState({
            firestoreUserDetails: userData.data(),
            certificateID: userData.id
        });
    }

    getCertificateID = () => {
        return "/c/" + this.state.certificateID;
    }

    componentDidMount(){
        this.fetchUserDataFromFirestore(this.props.user.email);
    }

    render(){
        return (
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-10 text-center logout-bttn" onClick={this.handleLogout}>
                            Logout
                        </div>
                    </div>
                    <br /><br /><br /><br />
                    <div className="row">
                        <div className="col-md-2 col-md-offset-5">
                            <center>
                                <img alt={this.props.user.name} className="img-responsive img-circle" src={this.props.user.photo} />
                            </center>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 text-center name-placeholder">
                            {this.props.user.name}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 text-center email-placeholder">
                            {this.props.user.email}
                        </div>
                    </div>
                    <br /><br /><br />
                    {this.state.firestoreUserDetails !== {} &&
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1 certificate-holder">
                                <center>
                                    <img alt={this.props.user.name + " certificate"} className="img-responsive" src={this.state.firestoreUserDetails.certificateImageUrl} />
                                </center>
                            </div>
                        </div>
                    }
                    <br /><br /><br />
                    {this.state.firestoreUserDetails.certificateUrl &&
                        <div className="row">
                            <div className="col-md-4 col-md-offset-2 text-center verify-certificate-placeholder">
                                <a href={this.state.firestoreUserDetails.certificateUrl} target="_blank" rel="noreferrer">
                                    Download certificate
                                </a>
                            </div>
                            <div className="col-md-4 text-center verify-certificate-placeholder">
                                <a href={this.getCertificateID()} target="_blank" rel="noreferrer">
                                    Share certificate
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (authReducer) => {
    const userState = authReducer.authReducer;
    return {
        user: userState.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: state => dispatch(logoutUser(state))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);