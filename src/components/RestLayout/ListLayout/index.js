import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { getAction } from '../TableLayout';

const currentPage = resourceData => {
  return Number(resourceData.skip) / Number(resourceData.limit) + 1;
};
class RestListLayout extends Component {
  state = {
    current: currentPage(this.props.resourceData),
  };

  onChangePagination = e => {
    const { resourceData } = this.props;
    this.setState({ current: e.current });
    this.props.retrieveList({
      skip: (e.current - 1) * e.pageSize,
      limit: e.pageSize,
      filter: resourceData.filter,
    });
  };

  onChangeRecord(record, item) {
    switch (item.props.type) {
      case 'switch':
        return this.props.updateRecord(
          record.id,
          {
            [item.props.source]: !record[item.props.source],
          },
          true,
        );

      default:
        return null;
    }
  }

  onChangePage = page => {
    const { resourceData } = this.props;
    this.props.retrieveList({
      skip: (page - 1) * (resourceData.limit || 20),
      limit: resourceData.limit || 20,
      filter: resourceData.filter,
    });
  };

  renderListItem = record => {
    const { children } = this.props;
    return React.Children.map(children, item => {
      return (
        <div key={item.props.title}>
          {React.cloneElement(item, {
            record,
            table: true,
            list: true,
            onChange: () => this.onChangeRecord(record, item),
            ...getAction(this.props, item),
          })}
        </div>
      );
    });
  };

  render() {
    const {
      resourceData,
      gotoEditPage,
      gotoEditCustomPage,
      deleteItem,
      cancelItem,
      confirmItem,
      gotoShowPage,
      responseRender,
      isList,
    } = this.props;
    return (
      <List
        grid={{ gutter: 16 }}
        pagination={{
          position: 'none',
          onChange: this.onChangePage,
          pageSize: resourceData.limit || 20,
        }}
        style={{ marginTop: 20 }}
        dataSource={(resourceData && resourceData.list) || []}
        renderItem={record => (
          <List.Item className="item" key={record.id}>
            {responseRender && !isList
              ? responseRender(record, {
                  gotoShowPage,
                  deleteItem,
                  gotoEditPage,
                  gotoEditCustomPage,
                  cancelItem,
                  confirmItem,
                })
              : this.renderListItem(record)}
          </List.Item>
        )}
      />
    );
  }
}



RestListLayout.propTypes = {
  retrieveList: PropTypes.func,
  resourceData: PropTypes.object,
  updateRecord: PropTypes.func,
  responseRender: PropTypes.func,
  gotoEditPage: PropTypes.func,
  gotoEditCustomPage: PropTypes.func,
  gotoShowPage: PropTypes.func,
  deleteItem: PropTypes.func,
  cancelItem: PropTypes.func,
  confirmItem: PropTypes.func,
  children: PropTypes.any,
  isList: PropTypes.bool,
};

export default RestListLayout;
