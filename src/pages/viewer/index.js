import { Component } from "react";
import { toast } from "react-toastify";
import "./viewer.css";

import { firebaseHandler } from "../../config/firebase";

class CertificateViewer extends Component{

    constructor(props){
        super(props);
        this.state = {
            user: {}
        };
    }

    fetchFirestoreData = async (certificateID) => {
        firebaseHandler.firestore().collection("members").doc(certificateID).get().then((data) => {
            console.log(data.data());
            this.setState({
                user: data.data()
            });
        }).catch((error) => {
            toast.error("Uh oh, an error occurred");
            console.log(error);
        });
        // try {
        //     // console.log(certificateID);
        //     const firebaseData = await firebaseHandler.firestore().collection("members").doc(certificateID).get();
        //     console.log(firebaseData.data());
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidMount(){
        const certificateID = this.props.match.url.replace("/c/", "");
        this.fetchFirestoreData(certificateID);
    }

    render(){
        return (
            <div className="certificate-placeholder">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 text-center certificate-title">Certificate</div>
                    </div>
                    <br />
                    {this.state.user.email && 
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 text-center certificate-issued-to">
                                Issued to <a href={"mailto:" + this.state.user.email}>
                                    {this.state.user.name}
                                </a>
                            </div>
                        </div>
                    }
                    <br /><br /><br />
                    {this.state.user.certificateImageUrl &&
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1 text-center certificate-holder">
                                <center>
                                    <img alt={this.state.user.name + " certificate"} className="img-responsive" src={this.state.user.certificateImageUrl} />
                                </center>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default CertificateViewer;