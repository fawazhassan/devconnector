import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const inputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

inputGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  icon: propTypes.string,
  error: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
};

inputGroup.defaultProps = {
  type: "text"
};

export default inputGroup;
