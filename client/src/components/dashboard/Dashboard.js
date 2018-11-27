import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has a profile set up.
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div style={{ margin: "auto", textAlign: "center" }}>
            <h4>{profile.handle}</h4>
            <h3>{profile.website}</h3>
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
      <div class="mainComp dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="dispay-4">Dashboard</h1>
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

Dashboard.PropTypes = {
  GetCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  Profile: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
