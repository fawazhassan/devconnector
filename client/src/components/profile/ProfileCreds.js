import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map((exp, index) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment>
          {exp.to === null ? (
            " - Present"
          ) : (
            <span>
              {" "}
              - <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            </span>
          )}
        </p>
        <p>
          <strong>Position: </strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map((edu, index) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment>
          {edu.to === null ? (
            " - Present"
          ) : (
            <span>
              {" "}
              - <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            </span>
          )}
        </p>
        <p>
          <strong>Degree: </strong> {edu.degree}
        </p>
        <p>
          <strong>Field of Study: </strong> {edu.fieldOfStudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">
            <strong>Experience</strong>
          </h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience provided</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">
            <strong>Education</strong>
          </h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education provided</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
