import React from 'react';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.doLogin = this.doLogin.bind(this);
    this.changeLoggedInStatus = this.changeLoggedInStatus.bind(this);
    this.changeErrorMessage = this.changeErrorMessage.bind(this);
  }

  changeLoggedInStatus() {
    this.setState({ loggedIn: true });
  }

  doLogin(e) {
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };

    e.preventDefault();
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
    });
  }

  changeErrorMessage(message) {
    this.resetForm();
    this.setState({errorMessage: message});
  }

  render() {
    return (
      <form onSubmit={this.doLogin}>
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

export default LoginForm;
