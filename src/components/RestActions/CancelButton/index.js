import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ButtonWrapper } from './styles';

const { confirm } = Modal;

class CancelButton extends Component {
  onOk = () => {
    const { cancelItem, record} = this.props;
    cancelItem(record.id);
  };

  handleCancel = () => {
    const { source, resource } = this.props;
    
    confirm({
      title: "Bạn có chắc chắn hủy không?",
      // content: I18n.t('popup.alertDeleteDes', { customMessage: `(#${record.id})` }),
      okText: "Chắc",
      cancelText: "Không",
      onOk: () => {
        this.onOk(source, resource);
      },
      onCancel: () => {},
    });
  };

  render() {
    return (
      <div>
        {/* <Tooltip header={<IntlMessages id="tooltip.delete" />}> */}
        <ButtonWrapper icon="delete" onClick={this.handleCancel}>
          Hủy bỏ
        </ButtonWrapper>
        {/* </Tooltip> */}
      </div>
    );
  }
}

CancelButton.propTypes = {
  cancelItem: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
  resource: PropTypes.string,
};

CancelButton.defaultProps = {
  source: 'cancel',
};

export default CancelButton;
