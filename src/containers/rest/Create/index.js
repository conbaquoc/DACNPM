import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { goBack as goBackAction } from "react-router-redux";
import Text from "../../../components/common/Text";
// import IntlMessages from '../../../components/utility/IntlMessages';
import RestCreateComponent from "../../../components/RestLayout/Create";
import { createRecord, searchMember } from "../../../redux/rest/actions";
import { closeModal as closeModalAction } from "../../../redux/modal/actions";

class RestCreate extends Component {
  onBack = () => {
    const { route, closeModal, goBack } = this.props;
    if (!route) {
      goBack();
    } else {
      closeModal();
    }
  };

  onSearch = (data) => {
    const { search } = this.props;
    search(data);
  };

  render() {
    const { 
      showModal, 
      title, 
      // resource 
    } = this.props;
    return !showModal ? (
      <RestCreateComponent
        {...this.props}
        onBack={this.onBack}
        search={this.onSearch}
      />
    ) : (
      <div>
        <Text type="h4White" className="modalTitle">
          {!title || typeof title === "string" ? title : title}
        </Text>
        <RestCreateComponent
          {...this.props}
          onBack={this.onBack}
          search={this.onSearch}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const defaultValues = decodeURI(props.location.search.substring(1)).trim();
  let defaultRecord;
  if (defaultValues !== "") {
    defaultRecord = JSON.parse(defaultValues);
  } else {
    defaultRecord = state.rest.resultSearch ? state.rest.resultSearch : {};
  }
  return {
    route: state.modal.current,
    record: defaultRecord,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    goBack: () => dispatch(goBackAction()),
    closeModal: () => dispatch(closeModalAction()),
    search: (data) => dispatch(searchMember(props.resource, data)),
    onSubmit: (data) =>
      dispatch(createRecord(props.resource, data, props.gotoShowPage)),
    gotoShowPage: (id) =>
      props.history.push(
        `${props.match.path.replace("create", "")}/${id}/edit`,
      ),
  };
};

RestCreate.propTypes = {
  title: PropTypes.any,
  goBack: PropTypes.func,
  search: PropTypes.func,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  resource: PropTypes.string,
  route: PropTypes.string,
};

const ConnectedRestCreate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestCreate);

ConnectedRestCreate.propTypes = {
  goShowPageWhenSuccess: PropTypes.bool,
};

ConnectedRestCreate.defaultProps = {
  goShowPageWhenSuccess: true,
};

export default ConnectedRestCreate;
