import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';

class ConnectedLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    }

    this.props.login(credentials);
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
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
        <input type="submit" value="Log In" />
      </form>
    );
  }
}

const mapDispatch = {
  login: userActions.login,
};

const LoginForm = connect(null, mapDispatch)(ConnectedLoginForm);

export default LoginForm;
