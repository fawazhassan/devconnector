import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user AND has a profile set up.
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h3 style={{ margin: "auto", textAlign: "center" }}>
              Welcome back{" "}
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </h3>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            {/*TODO: exp and  education*/}
            <div style={{ marginBottom: "60px" }}>
              <button
                onClick={this.onDelete.bind(this)}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        //User is Logged in but no profile has been created yet.
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome to Devconnector {user.name}
            </p>
            <p className="text-muted">
              You have not setup your profile yet, please add some info to get
              started
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="mainComp dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h1 className="dispay-4 text-center">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  deleteAccount: propTypes.func.isRequired,

  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
