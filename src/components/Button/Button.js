import React from "react";
import PropTypes from "prop-types";

const Button = ({ id, value, event }) => {
  return (
    <button id={id} onClick={event} value={value}>
      {value}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
