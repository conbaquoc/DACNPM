import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { retrieveOneRecord, deleteRecord, cancelRecord, confirmRecord } from "../../../redux/rest/actions";
import RestShowComponent from "../../../components/RestLayout/Show";
import { getOneRecord } from "../../../redux/rest/selectors";

class RestShow extends Component {
  constructor(props) {
    super(props);
    this.props.retrieveOneRecord();
  }

  render() {
    const { onBack, showModal } = this.props;

    return !showModal ? (
      <RestShowComponent {...this.props} />
    ) : (
      <div>
        <Modal visible onCancel={onBack} footer={null}>
          <RestShowComponent {...this.props} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.loading.isMainLoading,
    errorRequest: state.rest.errorRequest,
    record: getOneRecord(state, props.resource),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    retrieveOneRecord: () =>
      dispatch(retrieveOneRecord(props.resource, props.match.params.id)),
    onBack: () => props.history.goBack(),
    gotoEditPage: (id) =>
      props.history.push(
        `${props.match.path.replace("/:id/show", "")}/${id}/edit`,
      ),
    gotoEditCustomPage: (id) =>
      props.history.push(
        `${props.match.path.replace("/:id/show", "")}/${id}/edit`,
      ),
    deleteItem: (id) => {
      dispatch(deleteRecord(props.resource, id));
      props.history.push(props.match.path.replace("/:id/show", ""));
    },
    cancelItem: (id) => {
      dispatch(cancelRecord(props.resource, id));
      props.history.push(props.match.path.replace("/:id/show", ""));
    },
    confirmItem: (id, data) => {
      dispatch(confirmRecord(props.resource, id, data));
      props.history.push(props.match.path.replace("/:id/show", ""));
    },
  };
};
RestShow.propTypes = {
  retrieveOneRecord: PropTypes.func,
  onBack: PropTypes.func,
  showModal: PropTypes.bool,
};
export default connect(mapStateToProps, mapDispatchToProps)(RestShow);
