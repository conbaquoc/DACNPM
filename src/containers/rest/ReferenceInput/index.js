import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { retrieveReference, retrieveList } from "../../../redux/rest/actions";
import { getRecordData } from "../../../utils/tools";
import { getReferenceResources } from "../../../redux/rest/selectors";

class RestReference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
    };
  }

  componentDidMount() {
    const { record, source, initialFilter } = this.props;
    if (getRecordData(record, source)) {
      this.props.retrieveReference(getRecordData(record, source));
    }
    this.props.retrieveList(initialFilter || {});
    this.debouceSearch = _.debounce(this.onSearch, 300);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate(nextProps) {
    if (!_.isEqual(this.props.initialFilter, nextProps.initialFilter)) {
      this.props.retrieveList(nextProps.initialFilter);
    }
  }

  onSearch = (value) => {
    const { searchKey, initialFilter } = this.props;
    if (searchKey) {
      this.props.retrieveList({
        filter: _.assign(
          { [searchKey]: { $ilike: value } },
          initialFilter.filter,
        ),
      });
    }
  };

  retrieveListWaypoint() {
    if (this.state.limit < this.props.count) {
      const { limit } = this.state;
      const newLimit = limit + 20;
      this.setState({ limit: newLimit });
      this.props.retrieveList({ limit: newLimit });
    }
  }

  render() {
    const {
      resourceData,
      record,
      children,
      source,
      getFieldDecorator,
      setFieldsValue,
      form,
      searchKey,
      loadingData,
    } = this.props;
    const newChildren = React.cloneElement(children, {
      onSearch: (value) => {
        this.debouceSearch(value);
      },
      onEnter: () => this.retrieveListWaypoint(),
      searchKey,
      record,
      loading: loadingData,
      form,
      source,
      getFieldDecorator,
      setFieldsValue,
      resourceData,
    });
    return newChildren;
  }
}
RestReference.propTypes = {
  resourceData: PropTypes.array,
  record: PropTypes.object,
  retrieveList: PropTypes.func,
  children: PropTypes.node,
  source: PropTypes.string,
  retrieveReference: PropTypes.func,
  getFieldDecorator: PropTypes.func,
  setFieldsValue: PropTypes.func,
  form: PropTypes.object,
  searchKey: PropTypes.string,
  count: PropTypes.number,
  loadingData: PropTypes.bool,
  initialFilter: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  const data = state.rest[props.reference];
  return {
    // resourceData: getRecordData(props.record, props.source)
    //   ? data &&
    //     data.list &&
    //     state.rest[`${[props.reference]}Reference`] &&
    //     state.rest[`${[props.reference]}Reference`].list &&
    //     _.unionBy(data.list, state.rest[`${[props.reference]}Reference`].list, 'id')
    //   : data && data.list,
    resourceData: getReferenceResources(state, props),
    loadingData: data && data.loading,
    count: data && data.count,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    retrieveReference: (data) =>
      dispatch(
        retrieveReference(
          props.reference,
          Array.isArray(data) ? data : [data],
          props.mappedBy,
        ),
      ),
    retrieveList: (filter) => {
      return dispatch(retrieveList(props.reference, filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestReference);
