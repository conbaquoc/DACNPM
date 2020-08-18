import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import CustomBreadcrumb from '../../common/Breadcrumb';
import RestEditForm from '../RestEditForm';
import LayountContent from '../../utility/LayoutWrapper';
import Box from '../../utility/Box';
import PageHeader from '../../utility/PageHeader';

class RestEditComponent extends Component {
  state = {};

  onSearch = e => {
    e.preventDefault();
    const { search } = this.props;
    search(e.currentTarget.value);
  };

  render() {
    
    const { showModal, title, noCardWrapper, location, hadSearch } = this.props;
    const BREADCRUMB_LIST = [];
    const paths = location.pathname.split('/');
    paths.forEach((data, index) => {
      BREADCRUMB_LIST.push({
        title: data,
        path: `${BREADCRUMB_LIST[index - 1] ? BREADCRUMB_LIST[index - 1].path : ''}/${data}`,
      });
    });
    if (title && !showModal) {
      BREADCRUMB_LIST[paths.length].title = title || BREADCRUMB_LIST[paths.length].title;
    }
    const actions = <div />;
    return !showModal && !noCardWrapper ? (
      <LayountContent bordered={false} extra={actions}>
        <PageHeader>
          <CustomBreadcrumb data={BREADCRUMB_LIST} />
        </PageHeader>
        <Box>
          <RestEditForm {...this.props} />
        </Box>
      </LayountContent>
    ) : (
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
            <RestEditForm {...this.props} />
          </div>
        ) : (
          <RestEditForm {...this.props} />
        )}
      </div>
    );
  }
}

RestEditComponent.propTypes = {
  location: PropTypes.object,
  showModal: PropTypes.bool,
  title: PropTypes.any,
  noCardWrapper: PropTypes.bool,
  hadSearch: PropTypes.bool,
  search: PropTypes.func,
};

RestEditComponent.defaultProps = {
  noCardWrapper: false,
  hadSearch: false,
};

export default RestEditComponent;
