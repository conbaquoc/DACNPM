import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../form/FormInput';
import { getRecordData } from '../../../utils/tools';

const RestFormInput = props => {  
  return (
    <FormInput
      {...props}
      defaultValue={props.defaultValue || getRecordData(props.record, props.source)}
    />
  );
};

RestFormInput.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default RestFormInput;
