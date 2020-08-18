import React from 'react';
import PropTypes from 'prop-types';
import { getRecordData } from '../../../utils/tools';
import Text from '../../common/Text';

const LinkField = props => {
  return getRecordData(props.record, props.source) ? (
    <a
      type={props.type}
      href={(props.type && props.type + getRecordData(props.record, props.source)) || props.link}
      target="_bank"
    >
      {React.cloneElement(props.children, {
        value: getRecordData(props.record, props.source),
      })}
    </a>
  ) : (
    <i>
      <Text type="text" fontWeigth="light">
        Chưa cập nhật
      </Text>
    </i>
  );
};

LinkField.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  type: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.any,
};

LinkField.defaultProps = {
  format: data => data,
};
export default LinkField;
