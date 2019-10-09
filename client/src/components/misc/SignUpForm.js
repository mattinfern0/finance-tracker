import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import ApiMessenger from '../../controllers/ApiMessenger';


class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessages: [],
      success: false,
    };
    this.doSignUp = this.doSignUp.bind(this);
  }

  componentDidMount(){
    // Events.subscribe(EventTypes.login, this.changeLoggedInStatus);
  }

  doSignUp(e) {
    const username = this.state.username;
    const password = this.state.password;
    const password2 = this.state.confirmPassword;

    if (password2 !== password) {
      this.setState({ errorMessages: [{msg: 'Passwords don\'t match'}] });
      return e.preventDefault();
    }

    const credentials = {
      username,
      password,
    };

    ApiMessenger.signup(credentials)
      .then(() => {
        console.log('Successfully signed up');
        this.setState({
          success: true,
        });
      })
      .catch((err) => {
        console.log('Error signing up', err);
        if (err instanceof Response){
          return err.json();
        }
      })
      .then((data) => {
        if (!data){
          return;
        }
        this.setState({errorMessages: []});
        if (data.errors) {
          this.setState({errorMessages: data.errors });
        }
      });
    e.preventDefault();
  }

  render() {
    if (this.state.success) {
      return <Redirect to="/login" />;
    }

    return (
      <span>
        <h5>Todo-aholic</h5>
        <div id="signin-container" className="user-form-container">
          <h2>Sign Up</h2>
          <form onSubmit={this.doSignUp}>
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

          <span>
            <h3>{this.state.errorMessages.length > 0 && this.state.errorMessages[0].msg}</h3>
          </span>

          <span>
            {'Already have an account? '}
            <Link to="/login">Log In</Link>
          </span>
        </div>
      </span>
    );
  }
}

export default SignUpForm;
