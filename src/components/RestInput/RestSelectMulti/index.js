import React from 'react';
import PropTypes from 'prop-types';
import FormSelectMulti from '../../form/FormSelectMulti';
import { getRecordData } from '../../../utils/tools';

const RestSelectMulti = props => (
  <FormSelectMulti {...props} defaultValue={getRecordData(props.record, props.source)} />
);

RestSelectMulti.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
};
export default RestSelectMulti;
