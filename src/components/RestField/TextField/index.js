import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../common/TextField';
// import IntlMessages from '../../utility/IntlMessages';

const RestTextField = props => {
  const value = props.value ? props.value : props.record[props.source];
  return props.record ? <TextField {...props} value={value} /> : '';
};

RestTextField.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  value: PropTypes.string,
};
export default RestTextField;
