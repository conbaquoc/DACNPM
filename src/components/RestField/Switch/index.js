import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Popconfirm } from 'antd';
import { getRecordData } from '../../../utils/tools';
import { renderMessage } from '../../../utils/textProcessor';
// import IntlMessages from '../../utility/IntlMessages';

const RestSwitch = props => {
  
  const value = getRecordData(props.record, props.source) || props.value;
  // const value = getRecordData(props.record, props.source)
  
  return props.isShowConfirm ? (
    <Popconfirm
      title={
        !value ? renderMessage(props.confirmMessage) : renderMessage(props.cancelConfirmMessage)
      }
      onConfirm={props.onChange}
      okText={renderMessage('ok')}
      cancelText={renderMessage('cancel')}
    >
      {props.placeholder && (
        <span className="txtPlaceholder" style={{ marginRight: 5 }}>
          {/* <IntlMessages id={props.placeholder} /> */}
          {props.placeholder}
        </span>
      )}
      <Switch checked={value} disabled={!props.onChange} />
    </Popconfirm>
  ) : (
    <div style={{marginTop: '10px'}}>
      {props.placeholder && (
        <span className="txtPlaceholder" style={{ marginRight: '5px' }}>
          {/* <IntlMessages id={props.placeholder} /> */}
          {props.placeholder}
        </span>
      )}
      <Switch checked={value} onChange={props.onChange} disabled={!props.onChange} />
    </div>
  );
};

RestSwitch.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  isShowConfirm: PropTypes.bool,
  confirmMessage: PropTypes.string,
  cancelConfirmMessage: PropTypes.string,
  placeholder: PropTypes.string,
};

RestSwitch.defaultProps = {
  format: data => data,
};
export default RestSwitch;
