import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { receiveAuthedUserPre } from '../../actions/AuthedActions';
import { changeModal } from '../../actions/ModalActions';

class Login extends Component {
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
      const { apiUrl } = this.props;
      const loginHeaders = new Headers();
      loginHeaders.append('Content-Type', 'application/json');
      const url = `${apiUrl}auth/login`;

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
            this.props.changeModal(null);
            response.json().then(data => {
              this.props.receiveAuthedUserPre(data);
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
    return (
      <div>
        <div className="modal-header">Sign in</div>
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
            <div className="step-btn" onClick={this.props.step('signUp')}>Sign up</div>
          </div>
        </div>
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

Login.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  changeModal: PropTypes.func.isRequired,
  receiveAuthedUserPre: PropTypes.func.isRequired,
};

export default connect( mapStateToProps, { changeModal, receiveAuthedUserPre } )( Login );