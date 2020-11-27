import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PublicRoutes from './PublicRoutes/index';
import PrivateRoutes from './PrivateRoutes/index';
import RoutesWrapper from './styles'; // Styles for div contained routes
import NotFoundPage from '../containers/404Page/index';

class Routes extends Component {
  componentDidMount() {
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      setTimeout(() => {
        // fade out
        ele.classList.add('available');
      }, 500);
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = '';
      }, 1500);
    }
  }

  render() {
    return (
      <RoutesWrapper>
        <PrivateRoutes />
        <PublicRoutes />
        <Route component={NotFoundPage} />
      </RoutesWrapper>
    );
  }
}

export default Routes;
