import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { BoxTitle, BoxSubTitle } from './style';
// import IntlMessages from '../IntlMessages';

const BoxTitleUI = props => {
  return (
    <div style={{ marginBottom: 20 }}>
      {props.title ? (
        <BoxTitle className="isoBoxTitle">
          {props.icon && <Icon type={props.icon} />} 
          {/* <IntlMessages id={props.title} />{' '} */}
          props.title
        </BoxTitle>
      ) : (
        ''
      )}
      {props.subtitle ? (
        <BoxSubTitle className="isoBoxSubTitle"> 
          {props.subtitle}
        </BoxSubTitle>
      ) : (
        ''
      )}
    </div>
  );
};
BoxTitleUI.propTypes = {
  title: PropTypes.any,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
};

export default BoxTitleUI;
