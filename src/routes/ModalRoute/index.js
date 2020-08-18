import React, { lazy, Suspense, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../../components/common/LoadingScreen';
import { ModalWrapper } from '../../components/utility/ModalWrapper/styles';
import { closeModal as closeModalAction } from '../../redux/modal/actions';

const modalRoutes = [
  // {
  //   path: '/coupons/create',
  //   component: lazy(() => import('../../containers/Coupon/Create')),
  // },
  // {
  //   path: '/coupons',
  //   component: lazy(() => import('../../containers/Coupon/Edit')),
  // },
];

const getModalRoute = currentModal => {
  return currentModal && modalRoutes.find(route => currentModal.search(route.path) > -1);
};

class ModalRoute extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.currentModal && !prevState.visible) {
      return { visible: true, currentModal: nextProps.currentModal };
    }
    if (!nextProps.currentModal && prevState.visible) {
      return { visible: false, currentModal: null };
    }
    return {};
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: !!props.currentModal,
      currentModal: props.currentModal,
    };
  }

  render() {
    const { match, location, closeModal } = this.props;

    const { visible, currentModal } = this.state;
    const modal = getModalRoute(currentModal);
    const modalOptions = modal && modal.modalOptions ? modal.modalOptions : {};
    return (
      <ModalWrapper {...modalOptions} visible={visible} footer={null} onCancel={closeModal}>
        <Suspense fallback={<Loading />}>
          {modal && (
            <modal.component showModal location={location} match={match} key={modal.path} />
          )}
        </Suspense>
      </ModalWrapper>
    );
  }
}

ModalRoute.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  currentModal: PropTypes.string,
  closeModal: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    currentModal: state.modal.current,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModalAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalRoute);
