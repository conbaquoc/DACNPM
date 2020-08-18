import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ButtonWrapper } from './styles';

const { confirm } = Modal;

class ConfirmButton extends Component {
  onOk = () => {
    const { confirmItem, record} = this.props;
    const data = {
      status: 2,
    }
    confirmItem(record.id, data);
  };

  handleConfirm = () => {
    const { source, resource } = this.props;
    
    confirm({
      title: "Bạn muốn hoàn tất ?",
      // content: I18n.t('popup.alertDeleteDes', { customMessage: `(#${record.id})` }),
      okText: "Đúng",
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
        <ButtonWrapper icon="file-done" onClick={this.handleConfirm}>
          Hoàn tất
        </ButtonWrapper>
        {/* </Tooltip> */}
      </div>
    );
  }
}

ConfirmButton.propTypes = {
  confirmItem: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
  resource: PropTypes.string,
};

ConfirmButton.defaultProps = {
  source: 'cancel',
};

export default ConfirmButton;
