import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'antd';
import _ from 'lodash';
import CustomBreadcrumb from '../../common/Breadcrumb';
import CreateButton from '../../RestActions/CreateButton';
import ExportExcelButton from '../../RestActions/ExportExcelButton';
import RestTableLayout, {
  getAction,
  currentPage,
  showTotal,
} from '../TableLayout';
import LayoutContent from '../../utility/LayoutWrapper';
import Box from '../../utility/Box';
import PageHeader from '../../utility/PageHeader';
import RestFilterForm from '../FilterLayout';
import RestListLayout from '../ListLayout';
import { ListWrapper } from './styles';
// import IntlMessages from '../../utility/IntlMessages';
import SearchInput from '../../RestActions/SearchInput';

class RestListComponent extends Component {
  state = {};

  onTextSearch = text => {
    const { retrieveList } = this.props;
    retrieveList({
      filter: {
        q: text,
      },
    });
  };

  onChangePagination = (page, pageSize) => {
   
    
    const { resourceData } = this.props;
    const order = resourceData.order ? { order: resourceData.order } : {};
    this.props.retrieveList(
      _.assign(
        {
          skip: (page - 1) * pageSize,
          limit: pageSize,
          filter: resourceData.filter,
        },
        order,
      ),
    );
  };

  renderListItem = record => {
    const { children } = this.props;
    return React.Children.map(children, item => {
      return React.cloneElement(item, {
        record,
        onChange: () => this.onChangeRecord(record, item),
        ...getAction(this.props, item),
      });
    });
  };

  render() {
    const {
      retrieveList,
      noCardWrapper,
      resourceData,
      resource,
      hasCreate,
      gotoCreatePage,
      exportExcel,
      filter,
      title,
      isList,
      location,
      hasSearch,
      hasExport,
      createTitle,
      className,
      hasPaging,
      loadingExport,
    } = this.props;
    const BREADCRUMB_LIST = [];
    location.pathname.split('/').forEach((data, index) => {
      if (data === '') return;
      BREADCRUMB_LIST.push({
        title: data,
        path: `${
          BREADCRUMB_LIST[index - 1] ? BREADCRUMB_LIST[index - 1].path : ''
        }/${data}`,
      });
    });
    if (BREADCRUMB_LIST.length > 0) {
      BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1].title =
        typeof title === 'string' ? title : BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1].title
        
        // typeof title === 'string' ? (
        //   <IntlMessages id={title} />
        // ) : (
        //   title || BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1].title
        // );
    } else {
      BREADCRUMB_LIST[0] = {
        title:
          typeof title === 'string' ? title : BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1].title,
          
        path: '/',
      };
    }
    const actions = (
      <div className="vActions">
        {hasSearch && (
          <SearchInput
            defaultValue={
              resourceData && resourceData.filter && resourceData.filter.q
            }
            onTextSearch={this.onTextSearch}
          />
        )}
        {hasCreate && (
          <CreateButton
            title={createTitle}
            resource={resource}
            gotoCreatePage={gotoCreatePage}
          />
        )}
        {hasExport && (
          <ExportExcelButton
            loadingExport={loadingExport}
            exportExcel={exportExcel}
          />
        )}
      </div>
    );

    if (!resourceData) return null;
    const filterForm = filter ? (
      <RestFilterForm
        format={filter.props.format}
        resourceData={resourceData}
        retrieveList={retrieveList}
      >
        {filter}
      </RestFilterForm>
    ) : null;
    const pagimationView = (
      <Pagination
        showSizeChanger
        // showQuickJumper
        total={resourceData.count}
        defaultCurrent={currentPage(resourceData) || 1}
        current={currentPage(resourceData) || 1}
        showTotal={showTotal}
        pageSize={resourceData.limit || 10}
        onChange={this.onChangePagination}
        onShowSizeChange={this.onChangePagination}
      />
    );
    // const paginationTopView = (
    //   <Row
    //     className="paginationRow"
    //     justify="center"
    //     align="middle"
    //     type="flex"
    //     style={{ marginBottom: 20 }}
    //   >
    //     <Col md={actions ? 16 : 24} xs={24}>
    //       {pagimationView}
    //     </Col>
    //     {actions && (
    //       <Col md={8} xs={24}>
    //         <ActionView>{actions}</ActionView>
    //       </Col>
    //     )}
    //   </Row>
    // );

    const paginationBottomView = hasPaging ? (
      <Row
        className="paginationRow"
        justify="center"
        align="middle"
        type="flex"
      >
        <Col xs={24}>{pagimationView}</Col>
      </Row>
    ) : (
      <span />
    );

    const tableContent = (
      <div className="viewContent">
        {filterForm}
        {actions}
        <Box className="box">
          <RestTableLayout {...this.props} />
        </Box>
        {paginationBottomView}
      </div>
    );
    const listCotent = (
      <div className="viewContent">
        {filterForm}
        {actions}
        <RestListLayout {...this.props} />
      </div>
    );
    const content = isList ? (
      listCotent
    ) : (
      <Row className="viewContent">
        <Col md={0} xs={24}>
          {listCotent}
        </Col>
        <Col md={24} xs={0}>
          {tableContent}
        </Col>
      </Row>
    );
    return noCardWrapper ? (
      <ListWrapper className={className}>{content}</ListWrapper>
    ) : (
      <ListWrapper className={className}>
        <LayoutContent
          bordered={false}
          title={title ? (<CustomBreadcrumb data={BREADCRUMB_LIST} />) : ''}
          extra={actions}
        >
          <PageHeader>
            {title ? (<CustomBreadcrumb data={BREADCRUMB_LIST} />): '' }
            
          </PageHeader>
          {content}
        </LayoutContent>
      </ListWrapper>
    );
  }
}

RestListComponent.propTypes = {
  resource: PropTypes.string,
  noCardWrapper: PropTypes.bool,
  retrieveList: PropTypes.func,
  resourceData: PropTypes.object,
  hasCreate: PropTypes.bool,
  gotoCreatePage: PropTypes.func,
  filter: PropTypes.object,
  title: PropTypes.any,
  children: PropTypes.any,
  isList: PropTypes.bool,
  hasSearch: PropTypes.bool,
  hasExport: PropTypes.bool,
  location: PropTypes.object,
  createTitle: PropTypes.string,
  className: PropTypes.string,
  hasPaging: PropTypes.bool,
  exportExcel: PropTypes.func,
  loadingExport: PropTypes.bool,
};
RestListComponent.defaultProps = {
  noCardWrapper: false,
  isList: false,
  hasExport: false,
  hasSearch: false,
  hasCreate: true,
  hasPaging: true,
};
export default RestListComponent;
