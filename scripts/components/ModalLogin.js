import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { receiveAuthedUserPre } from '../actions/AuthedActions';

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      email: '',
      password: '',
      error: '',
    };
    this.step = step => () => {
      this.setState({ step });
    };
    this.onChangeUsername = (e) => {
      this.setState({ email: e.target.value });
      this.setState({ error: '' });
    };
    this.onChangePassword = (e) => {
      this.setState({ password: e.target.value });
      this.setState({ error: '' });
    };
    this.login = () => {
      const { email, password } = this.state;
      const { dispatch, apiUrl } = this.props;
      const loginHeaders = new Headers();
      loginHeaders.append('Content-Type', 'application/json');
      const url = `${apiUrl} + auth/login`;

      fetch(url, {
        method: 'post',
        headers: loginHeaders,
        body: JSON.stringify({
          email,
          password,
        }),
      })
      .then(response => {
        if (response.ok) {
          this.props.closeModal();
          response.json().then(data => {
            dispatch(receiveAuthedUserPre(data));
          });
        } else {
          response.json().then(data => {
            this.setState({ error: data.message });
          });
        }
      });
    };
    this.signUp = () => {
      const { email, password } = this.state;
      const { dispatch, apiUrl } = this.props;
      const signUpHeaders = new Headers();
      signUpHeaders.append('Content-Type', 'application/json');
      const url = `${apiUrl} + users`;
      fetch(url, {
        method: 'post',
        headers: signUpHeaders,
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(response => {
          if (response.ok) {
            this.props.closeModal();
            response.json().then(data => {
              dispatch(receiveAuthedUserPre(data));
            });
          } else {
            response.json().then(data => {
              this.setState({ error: data.message });
            });
          }
        });
    };
    this.handleLoginKeypress = (e) => {
      const isEnterKeypress = e.key === 'Enter';
      if (!isEnterKeypress) {
        return;
      }
      this.login();
    };
  }
  render() {
    const onClickFunc = e => { e.stopPropagation(); };
    let modalBody = (
      <div className="modal-body">
        <div className="btn facebook">Log in With Facebook</div>
        <div className="btn twitter">Log in With Twitter</div>
        <div className="btn vkontakte">Log in With VKontakte</div>
        <div className="or">or</div>
        <input
          value={this.state.email}
          onChange={this.onChangeUsername}
          className="generic-input"
          type="email"
          maxLength="75"
          placeholder="Email or Username"
          onKeyDown={this.handleLoginKeypress}
        />
        <input
          value={this.state.password}
          onChange={this.onChangePassword}
          className="generic-input"
          type="password"
          maxLength="25"
          onKeyDown={this.handleLoginKeypress}
          placeholder="Password"
        />
        <div className={classNames('login-error', { show: this.state.error.length })}>
          {this.state.error}
        </div>
        <div className="btn email" onClick={this.login}>Login</div>
        <div className="modal-footer">
          <div className="step-btn" onClick={this.step('signUp')}>Sign up</div>
        </div>

      </div>
    );
    if (this.state.step === 'signUp') {
      modalBody = (
        <div className="modal-body">
          <div className="btn facebook">Sign up With Facebook</div>
          <div className="btn twitter">Sign up With Twitter</div>
          <div className="btn vkontakte">Sign up With VKontakte</div>
          <div className="or">or</div>
          <input
            value={this.state.email}
            onChange={this.onChangeUsername}
            className="generic-input"
            type="email"
            maxLength="75"
            placeholder="Email or Username"
            onKeyDown={this.handleLoginKeypress}
          />
          <input
            value={this.state.password}
            onChange={this.onChangePassword}
            className="generic-input"
            type="password"
            maxLength="25"
            onKeyDown={this.handleLoginKeypress}
            placeholder="Password"
          />
          <div className={classNames('login-error', { show: this.state.error.length })}>
            {this.state.error}
          </div>
          <div className="btn email" onClick={this.signUp}>Sign Up</div>
          <div className="modal-footer">
            <div className="step-btn" onClick={this.step('login')}>Login</div>
          </div>
        </div>
      );
    }
    return (
      <div className="modal-content" onClick={onClickFunc}>
        <div className="modal-header">Sign in</div>
        {modalBody}

      </div>
    );
  }
}
function mapStateToProps(state) {
  const { apiUrl } = state.environment;

  return {
    apiUrl,
  };
}

ModalLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(ModalLogin);
