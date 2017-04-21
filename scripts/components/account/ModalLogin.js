import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Login from './login';
import Signup from './signup';

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
    };
    this.step = step => () => {
      this.setState({ step });
    };
  }
  render() {
    const onClickFunc = e => { e.stopPropagation(); };
    let loginStep = <Login step={this.step}/>;
    if (this.state.step === 'signUp') {
      loginStep = <Signup step={this.step}/>;
    }
    return (
      <div className="modal-content" onClick={onClickFunc}>
        { loginStep }
      </div>
    );
  }
}
export default ModalLogin;
