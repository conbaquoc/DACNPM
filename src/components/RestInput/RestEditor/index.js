import React from 'react';
import PropTypes from 'prop-types';
import FormEditor from '../../form/FormEditor';

const RestEditor = props => {
  return (
    <FormEditor
      {...props}
      form={props.form}
      />
  );
};

RestEditor.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default RestEditor;
