import React from 'react';
import PropTypes from 'prop-types';
import FormUpload from '../../form/FormUploadLogo';
import { getRecordData } from '../../../utils/tools';

const RestUpload = props => {
  return (
    <FormUpload
      {...props}
      defaultValue={props.defaultValue || getRecordData(props.record, props.source)}
    />
  );
};

RestUpload.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default RestUpload;
