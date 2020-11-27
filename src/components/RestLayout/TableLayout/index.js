import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
// import IntlMessages from '../../utility/IntlMessages';
import Text from '../../common/Text';
import { getRecordData } from '../../../utils/tools';

class RestTableLayout extends Component {
  onChangePagination = (e, filters, sorter) => {
    const { resourceData, retrieveList } = this.props;
    const formatFilter = {};
    const formatSort =
      sorter && sorter.field ? `${sorter.order === 'descend' ? '-' : ''}${sorter.field}` : null;
    Object.keys(filters).forEach(filter => {
      formatFilter[filter] = { $in: filters[filter] };
    });
    retrieveList({
      skip: (e.current - 1) * e.pageSize,
      limit: e.pageSize,
      filter: { ...resourceData.filter, ...formatFilter },
      order: formatSort,
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

  getSortOrder = children => {
    const { resourceData } = this.props;
    if (
      !children.props.sorter ||
      !resourceData.order ||
      resourceData.order.indexOf(children.props.source) === -1
    ) {
      return undefined;
    }
    return children.props.sorter && resourceData.order && resourceData.order.search('-') > -1
      ? 'descend'
      : 'ascend';
  };

  render() {
    const {
      resourceData,
      children,
      gotoEditPage,
      loading,
      onRow,
      customQuery,
      hasScroll,
    } = this.props;
    const columns = children.map((item, index) => {
      return {
        fixed: item.props.fixed,
        title: item.props.title || null,
        dataIndex: item.props.source,
        width: item.props.width,
        align: item.props.align,
        key: `${item.props.source}col${index}`,
        sorter: item.props.sorter
          ? (a, b) => {
              return getRecordData(a, item.props.source) > getRecordData(b, item.props.source);
            }
          : undefined,
        sortOrder: this.getSortOrder(item),
        filters: item.props.filters,
        filterMultiple: item.props.filterMultiple,
        onFilter: (value, record) => {
          return `${getRecordData(record, item.props.source)}`.search(`${value}`) > -1;
        },
        render:
          item.props.render ||
          ((obj, record) => {
            const RecordComponent = React.cloneElement(item, {
              table: true,
              record,
              loading: resourceData.itemLoading && resourceData.itemLoading[record.id],
              onChange: () => this.onChangeRecord(record, item),
              customQuery,
              ...getAction(this.props, item),
            });
            return RecordComponent;
          }),
      };
    });

    return (
      <Table
        onRow={record => {
          return {
            onDoubleClick: () => {
              onRow ? onRow(record.id) : gotoEditPage(record.id);
            },
          };
        }}
        onChange={this.onChangePagination}
        pagination={{
          position: 'none',
          total: resourceData.count,
          current: currentPage(resourceData),
          showTotal,
          pageSize: resourceData.limit,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        columns={columns}
        loading={loading}
        dataSource={(resourceData && resourceData.list) || []}
        rowKey="id"
        scroll={hasScroll || {}}
      />
    );
  }
}

export const currentPage = resourceData => {
  return Number(resourceData.skip) / Number(resourceData.limit) + 1;
};

export const showTotal = (total, range) => {
  return (
    <Text type="button" className="txtTotal">
      {` ${range.join(' - ')}/${total} `}
      {/* <IntlMessages id={total > 1 ? 'text.records' : 'text.record'} /> */}
    </Text>
  );
};
export const getAction = (props, item) => {
  switch (item.props.source) {
    case 'edit':
      return { gotoEditPage: item.props.gotoEditPage || props.gotoEditPage };
    case 'editCustom':
      return { gotoEditCustomPage: item.props.gotoEditCustomPage || props.gotoEditCustomPage };
    case 'delete':
      return { deleteItem: item.props.deleteItem || props.deleteItem };
    case 'cancel':
      return { cancelItem: item.props.cancelItem || props.cancelItem };
    case 'confirm':
      return { confirmItem: item.props.confirmItem || props.confirmItem };
    case 'show':
      return { gotoShowPage: item.props.gotoShowPage || props.gotoShowPage };
    case 'group':
      return {
        gotoShowPage: props.gotoShowPage,
        deleteItem: props.deleteItem,
        gotoEditPage: props.gotoEditPage,
        gotoEditCustomPage: props.gotoEditCustomPage,
        cancelItem: props.cancelItem,
        confirmItem: props.confirmItem,
      };

    default:
      return {};
  }
};

RestTableLayout.propTypes = {
  children: PropTypes.node,
  retrieveList: PropTypes.func,
  gotoEditPage: PropTypes.func,
  resourceData: PropTypes.object,
  loading: PropTypes.bool,
  updateRecord: PropTypes.func,
  onRow: PropTypes.func,
  customQuery: PropTypes.func,
  hasScroll: PropTypes.any,
};

RestTableLayout.defaultProps = {
  hasScroll: { x: 1128 },
};

export default RestTableLayout;
