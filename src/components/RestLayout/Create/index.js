import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import CustomBreadcrumb from '../../common/Breadcrumb';
import BackButton from '../../RestActions/BackButton';
import RestCreateForm from '../RestCreateForm';
import LayoutContent from '../../utility/LayoutWrapper';
import Box from '../../utility/Box';
import PageHeader from '../../utility/PageHeader';

class RestCreateComponent extends Component {
  constructor(props) {
    super(props);
    this.formCreateRef = React.createRef();
  }

  onSearch = e => {
    e.preventDefault();
    const { search } = this.props;
    search(e.currentTarget.value);
  };

  render() {
    const { onBack, showModal, title, location, noCardWrapper, hadSearch } = this.props;
    const BREADCRUMB_LIST = [];
    location.pathname.split('/').forEach((data, index) => {
      BREADCRUMB_LIST.push({
        title: data,
        path: `${BREADCRUMB_LIST[index - 1] ? BREADCRUMB_LIST[index - 1].path : ''}/${data}`,
      });
    });

    const actions = <BackButton onBack={onBack} />;
    const content = (
      <div style={{ width: '100%' }}>
        {hadSearch ? (
          <div>
            <div className="box-search">
              <Input
                placeholder={'Nhập ID thành viên và nhấn "Enter" để tìm'}
                prefix={<Icon type="search" />}
                onPressEnter={this.onSearch}
                className="input"
              />
            </div>
            <RestCreateForm {...this.props} />
          </div>
        ) : (
          <RestCreateForm {...this.props} />
        )}
      </div>
    );
    return showModal || noCardWrapper ? (
      content
    ) : (
      <LayoutContent bordered={false} extra={actions}>
        {title || (
          <PageHeader>
            <CustomBreadcrumb data={BREADCRUMB_LIST} />
          </PageHeader>
        )}
        {<Box>{content}</Box>}
      </LayoutContent>
    );
  }
}
RestCreateComponent.propTypes = {
  onBack: PropTypes.func,
  showModal: PropTypes.bool,
  title: PropTypes.any,
  location: PropTypes.object,
  noCardWrapper: PropTypes.bool,
  hadSearch: PropTypes.bool,
  search: PropTypes.func,
};
RestCreateComponent.defaultProps = {
  noCardWrapper: false,
  hadSearch: false,
};
export default RestCreateComponent;
