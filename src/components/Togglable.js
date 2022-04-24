import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ hideLabel, showLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((prev) => !prev);

  // we are allowing that the ref from outside can call the function toggleVisibility
  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div className="Togglable">
      {
        (!visible)
          ? (
            <button type="button" onClick={toggleVisibility}>{showLabel}</button>
          )
          : (
            <div className="TogglableContent">
              {children}
              <button type="button" onClick={toggleVisibility}>{hideLabel}</button>
            </div>
          )
      }
    </div>
  );
});

Togglable.propTypes = {
  hideLabel: PropTypes.string.isRequired,
  showLabel: PropTypes.string.isRequired,
};

export default Togglable;
