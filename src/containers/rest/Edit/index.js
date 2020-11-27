import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { goBack as goBackAction } from "react-router-redux";
// import IntlMessages from '../../../components/utility/IntlMessages';
import Text from "../../../components/common/Text";
import {
  editRecord,
  retrieveOneRecord,
  searchMember,
} from "../../../redux/rest/actions";
import RestEditComponent from "../../../components/RestLayout/Edit";
import { getOneRecord } from "../../../redux/rest/selectors";
import { getIdByUrl } from "../../../utils/tools";
import { closeModal as closeModalAction } from "../../../redux/modal/actions";

class RestEdit extends Component {
  constructor(props) {
    super(props);
    props.retrieveOneRecord(getIdByUrl(props));
  }

  onBack = () => {
    const { route, closeModal, goBack } = this.props;
    if (!route) {
      goBack();
    } else {
      closeModal();
    }
  };

  onSubmit = (data) => {
    const { onSubmit } = this.props;
    onSubmit(getIdByUrl(this.props), data);
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
      <RestEditComponent
        {...this.props}
        onBack={this.onBack}
        onSubmit={this.onSubmit}
        search={this.onSearch}
      />
    ) : (
      <div>
        <Text type="h4White" className="modalTitle">
          {!title || typeof title === "string" ? title : title}
        </Text>
        <RestEditComponent
          {...this.props}
          showModal
          onBack={this.onBack}
          onSubmit={this.onSubmit}
          search={this.onSearch}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.loading.isMainLoading,
    errorRequest: state.rest.errorRequest,
    record: getOneRecord(state, props.resource),
    route: state.modal.current,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    retrieveOneRecord: (id) => dispatch(retrieveOneRecord(props.resource, id)),
    onSubmit: (id, data) => {
      dispatch(editRecord(props.resource, id, data));
    },
    gotoShowPage: (id) =>
      props.history.push(
        `${props.match.path.replace("/:id/edit", "")}/${id}/show`,
      ),
    closeModal: () => dispatch(closeModalAction()),
    goBack: () => dispatch(goBackAction()),
    search: (data) => dispatch(searchMember(props.resource, data)),
  };
};
RestEdit.propTypes = {
  retrieveOneRecord: PropTypes.func,
  showModal: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.any,
  resource: PropTypes.string,
  closeModal: PropTypes.func,
  goBack: PropTypes.func,
  route: PropTypes.string,
  search: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestEdit);
