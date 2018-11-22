import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: ""
    };
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }

    if (this.props.auth.isAuthenticated) {
      const welcomeName = this.props.auth.user.name.split(" ")[0];
      this.setState({ firstname: welcomeName });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const guestLanding = (
      <div>
        <p className="lead">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="pt-3">
          <Link to="/register" className="btn btn-lg btn-info mr-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-lg btn-light">
            Login
          </Link>
        </div>
      </div>
    );

    const userLanding = (
      <div>
        <p className="h3 mb-4">Welcome back {this.state.firstname}</p>
        <hr />
        <hr />

        <Link
          to="/dashboard"
          id="homescreen_dashboard"
          className="btn btn-lg btn-info"
        >
          Go to Dashboard
        </Link>
      </div>
    );

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container ">
            <div className="row vertical-center">
              <div className="col-md-12 text-center pb-5">
                <h1 className="display-3 mb-4">Developer Connector</h1>

                {isAuthenticated ? userLanding : guestLanding}
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
