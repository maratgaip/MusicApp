import React, { Component } from 'react';
import classNames from 'classnames';
import { receiveAuthedUserPre } from '../actions/AuthedActions';

class ModalLogin extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      step: '',
      email: '',
      password: '',
      error: ''
    };
    this.signUp = () => {
      this.setState( { step: 'signup'} )
    };
    this.onChangeUsername = ( e ) => {
      this.setState( { email: e.target.value } );
      this.setState( { error: '' } );
    };
    this.onChangePassword = ( e ) => {
      this.setState( { password: e.target.value } );
      this.setState( { error: '' } );
    };
    this.login = () => {
      const { email, password } = this.state;
      const { dispatch} = this.props;
      var loginHeaders = new Headers();
      loginHeaders.append('Content-Type', 'application/json');
      fetch('http://localhost:4040/api/auth/login', {
        method: 'post',
        headers: loginHeaders,
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then( response => {
        if (response.ok) {
          this.props.closeModal();
          response.json().then( data => {
            dispatch(receiveAuthedUserPre(data));
          })
        } else {
          response.json().then( data => {
            this.setState({ error: data.message })
          })
        }
      })
      .catch(err => { console.log("login failed", err) });
    };
    this.handleLoginKeypress = ( e ) => {
      var isEnterKeypress = e.key === 'Enter';
      if( !isEnterKeypress ) {
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
          id="signin_username"
          value={ this.state.email }
          onChange={ this.onChangeUsername }
          className="generic-input"
          type="email"
          maxLength="75"
          placeholder="Email or Username"
          onKeyDown={ this.handleLoginKeypress }
          />
        <input
          id="signin_password"
          value={ this.state.password }
          onChange={ this.onChangePassword }
          className="generic-input"
          type="password"
          maxLength="25"
          onKeyDown={ this.handleLoginKeypress }
          placeholder="Password"
          />
        <div className={ classNames( 'login-error', { show: this.state.error.length } ) }>
          { this.state.error }
        </div>
        <div className="btn email" onClick={ this.login }>Login</div>

      </div>
    );
    if (this.state.step === 'signup') {
       modalBody = (
        <div className="modal-body">
          <div className="btn facebook">Log in With Facebook</div>
          <div className="btn twitter">Log in With Twitter</div>
          <div className="btn vkontakte">Log in With VKontakte</div>
          <div className="btn email">Email</div>
          <div className="sign-in" onClick={ this.signUp }>Sign Up</div>
        </div>
      );
    }
    return (
      <div className="modal-content" onClick={onClickFunc}>
        <div className="modal-header">Sign in</div>
        { modalBody }
        <div className="modal-footer"></div>
      </div>
    );
  }
}

export default ModalLogin;