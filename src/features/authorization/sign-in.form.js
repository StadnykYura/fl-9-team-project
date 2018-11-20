import React, { Component } from 'react';
import { auth } from '../../firebase';

import AuthService from './auth-service';
import Loader from '../Loader/Loader';

const stateSetter = (propName, value) => ({
  [propName]: value,
});

const initial_state = {
  email: '',
  password: '',
  error: null,
  isLoading: false,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initial_state };
    this.Auth = new AuthService();
  }

  // arrow function remembers the context
  onSubmit = event => {
    this.setState(stateSetter('isLoading', true));

    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...initial_state });
        this.props.auth.authorize(authUser.user.uid);
      })
      .catch(error => {
        this.setState({ ...initial_state });
        this.setState(stateSetter('error', error));
      });

    event.preventDefault();
  };

  handleChange(event, property) {
    return this.setState(stateSetter(property, event.target.value));
  }

  render() {
    const { email, password, error, isLoading } = this.state;

    const isInvalid = email === '' || password === '';

    return (
      <div className="main-for-sin-in">
        {isLoading ? (
          <Loader />
        ) : (
          <form className="form-main-for-sin-in" onSubmit={this.onSubmit}>
            <div className="form-greeting">Sign In to your account</div>
            <div>
              <input
                className="main-for-sin-in-email"
                value={email}
                type="text"
                placeholder="Email Address"
                onChange={event => this.handleChange(event, 'email')}
              />
            </div>
            <div className="main-for-sin-in-email">
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={event => this.handleChange(event, 'password')}
              />
            </div>
            <div>
              <button
                className=" main-for-sin-in-bottom "
                disabled={isInvalid}
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div className="error-message">
              {error && <p>{error.message}</p>}
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default SignInForm;
