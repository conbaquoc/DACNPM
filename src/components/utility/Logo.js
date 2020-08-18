/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
// import { siteConfig } from '../../configs';

const Logo = ({ onClick }) => {
  return (
    <div
      role="button"
      onClick={onClick}
      style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
    >
      {/* {siteConfig.siteIcon} */}
      {/* {siteConfig.siteName} */}
    </div>
  );
};

Logo.propTypes = {
  onClick: PropTypes.func,
};

export default Logo;
