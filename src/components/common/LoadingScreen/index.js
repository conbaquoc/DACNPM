import React, { PureComponent } from 'react';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

class LoadingComponent extends PureComponent {
  constructor(props) {
    super(props);
    Nprogress.configure({ showSpinner: false });
    Nprogress.start();
  }

  componentWillUnmount() {
    Nprogress.done();
  }

  render() {
    return <span />;
  }
}

export default LoadingComponent;
