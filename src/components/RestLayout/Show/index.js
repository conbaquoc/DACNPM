import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomBreadcrumb from '../../common/Breadcrumb';
import ButtonEdit from '../../RestActions/EditButton';
import DeleteButton from '../../RestActions/DeleteButton';
import CancelButton from '../../RestActions/CancelButton';
import Layout from '../../common/Layout';
import Box from '../../common/Box';
import ActionView from '../ActionLayout';
import PageTitle from '../../common/PageTitle';
import { makeBreadCrumbFromPath } from '../../../utils/tools';

class RestShowComponent extends Component {
  state = {};

  render() {
    const {
      noCardWrapper,
      noActions,
      deleteItem,
      gotoEditPage,
      gotoEditCustomPage,
      cancelItem,
      confirmItem,
      record,
      resource,
      resourceCustom,
      children,
      hasEdit,
      hasEditCustom,
      hasDel,
      hasCancel,
      header,
      location,
    } = this.props;
    const BREADCRUMB_LIST = makeBreadCrumbFromPath(location);

    if (!record) return null;

    const actions = (
      <div>
        {hasEdit && (
          <ButtonEdit
            resource={resource}
            record={record}
            gotoEditPage={gotoEditPage}
          />
        )}
        {hasEditCustom && (
          <ButtonEdit
            resource={resourceCustom}
            record={record}
            gotoEditCustomPage={gotoEditCustomPage}
          />
        )}
        {hasDel && (
          <DeleteButton
            resource={resource}
            record={record}
            deleteItem={deleteItem}
          />
        )}
        {hasCancel && (
          <CancelButton
            resource={resource}
            record={record}
            cancelItem={cancelItem}
            confirmItem={confirmItem}
          />
        )}
      </div>
    );

    const components = React.Children.map(children, element =>
      React.cloneElement(element, { key: element.props.source, record }),
    );

    const content = (
      <div style={{ width: '100%', height: '100%' }}>
        {!noActions && <ActionView>{actions}</ActionView>}
        {components}
      </div>
    );

    return noCardWrapper ? (
      content
    ) : (
      <Layout bordered={false} extra={actions}>
        {header || (
          <PageTitle>
            <CustomBreadcrumb data={BREADCRUMB_LIST} />
          </PageTitle>
        )}
        <Box>{content}</Box>
      </Layout>
    );
  }
}
RestShowComponent.propTypes = {
  children: PropTypes.node,
  record: PropTypes.object,
  noCardWrapper: PropTypes.bool,
  deleteItem: PropTypes.func,
  gotoEditPage: PropTypes.func,
  gotoEditCustomPage: PropTypes.func,
  resource: PropTypes.string,
  resourceCustom: PropTypes.string,
  hasEdit: PropTypes.bool,
  hasEditCustom: PropTypes.bool,
  hasDel: PropTypes.bool,
  hasCancel: PropTypes.bool,
  header: PropTypes.any,
  noActions: PropTypes.bool,
  location: PropTypes.object,
};

RestShowComponent.defaultProps = {
  noCardWrapper: false,
};
export default RestShowComponent;
