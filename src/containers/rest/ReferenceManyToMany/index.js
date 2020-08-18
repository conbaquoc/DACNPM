import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, some, filter, uniqBy } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { retrieveReference } from '../../../redux/rest/actions';
import { getRecordData } from '../../../utils/tools';

class RestReferenceManyToMany extends Component {
  componentDidMount() {
    const { record, source, isCollection, arrayField } = this.props;
    this.props.retrieveReference(
      isCollection
        ? map(getRecordData(record, source), item => getRecordData(item, arrayField))
        : getRecordData(record, source),
    );
  }

  render() {
    const {
      resourceData,
      reference,
      retrieveList,
      children,
      type,
      gotoShowPage,
      isLink,
      loading,
      rootPath,
    } = this.props;
    return (
      <div>
        {type === 'singleElement'
          ? resourceData.map(
              data =>
                isLink ? (
                  <Link
                    key={Math.random()}
                    href={`${rootPath}/${reference}/${data.id}/edit`}
                    to={`${rootPath}/${reference}/${data.id}/edit`}
                  >
                    {React.cloneElement(children, {
                      record: data,
                      loading,
                      retrieveList,
                    })}
                  </Link>
                ) : (
                  React.cloneElement(children, {
                    key: Math.random(),
                    resourceData: {
                      list: resourceData,
                      count: resourceData.length,
                    },
                    loading,
                    record: data,
                    retrieveList,
                  })
                ),
            )
          : React.cloneElement(children, {
              resourceData: {
                list: resourceData,
                count: resourceData.length,
              },
              loading,
              retrieveList,
              gotoShowPage,
            })}
      </div>
    );
  }
}

const mapStateToProps = (
  state,
  { reference, record, source, isCollection, arrayField, mappedBy },
) => {
  return {
    resourceData:
      state.rest[`${[reference]}Reference`] && state.rest[`${[reference]}Reference`].list
        ? (isCollection &&
            uniqBy(
              filter(state.rest[`${[reference]}Reference`].list, item =>
                some(
                  getRecordData(record, source),
                  obj => item[mappedBy || 'id'] === getRecordData(obj, arrayField),
                ),
              ),
              mappedBy || 'id',
            )) ||
          uniqBy(
            filter(state.rest[`${[reference]}Reference`].list, obj =>
              some(getRecordData(record, source), item => obj[mappedBy || 'id'] === item),
            ),
            mappedBy || 'id',
          )
        : [],
    loading: state.rest[`${[reference]}Reference`] && state.rest[`${[reference]}Reference`].loading,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    retrieveReference: ids => dispatch(retrieveReference(props.reference, ids, props.mappedBy)),
    gotoShowPage: id => props.history.push(`/auth/${props.reference}/${id}/show`),
  };
};

RestReferenceManyToMany.propTypes = {
  resourceData: PropTypes.array,
  record: PropTypes.object,
  retrieveList: PropTypes.func,
  children: PropTypes.node,
  source: PropTypes.string,
  retrieveReference: PropTypes.func,
  gotoShowPage: PropTypes.func,
  reference: PropTypes.string,
  isLink: PropTypes.bool,
  isCollection: PropTypes.bool,
  loading: PropTypes.bool,
  arrayField: PropTypes.string,
  rootPath: PropTypes.string,
  type: PropTypes.oneOf(['singleElement', 'list', 'table']),
};

RestReferenceManyToMany.defaultProps = {
  type: 'singleElement',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestReferenceManyToMany);
