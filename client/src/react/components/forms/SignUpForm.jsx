import React from 'react';
import  { connect } from 'react-redux';
import { userActions } from '../../../redux/actions';

class ConnectedSignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.doSignUp = this.doSignUp.bind(this);
  }

  doSignUp(e) {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    if (credentials.password !== credentials.confirmPassword) {
      this.props.signupError('Passwords don\'t match');
    } else {
      this.props.signup(credentials);
    }
  }

  render() {
    return (
      <form className="form-auth" onSubmit={this.doSignUp}>
        <input
          type="text"
          value={this.state.username}
          name="username"
          onChange={(e) => this.setState({username: e.target.value})}
          placeholder="Username"
        />
        <input
          type="password"
          value={this.state.password}
          name="password"
          onChange={(e) => this.setState({password: e.target.value})}
          placeholder="Password"
        />
        <input
          type="password"
          value={this.state.confirmPassword}
          name="confirm-password"
          onChange={(e) => this.setState({confirmPassword: e.target.value})}
          placeholder="Confirm Password"
        />
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

const mapDispatch = {
  signup: userActions.signup,
  signupError: userActions.signupError,
}

const SignUpForm = connect(null, mapDispatch)(ConnectedSignUpForm);

export default SignUpForm;
