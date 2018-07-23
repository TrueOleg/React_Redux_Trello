import React from 'react';   
import { connect } from 'react-redux'; 
import { Redirect} from 'react-router'; 
import { Link } from 'react-router-dom';

import * as styles from '../style/SignInPage';
import * as actions from '../../redux/actions/authAction';


class SignInPage extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {credentials: {login: '', password: ''}};
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    this.props.logInUser(this.state.credentials);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>;
    }
    return (
        <form style={styles.formLogin}>
          <h1>Sign-in</h1>
          <p>Enter login</p>
          <input
            style={styles.input}
            name  = "login"
            label = "login"
            value={this.state.credentials.login}
            onChange={this.onChange}
          />
          <p>Enter password</p>
          <input
            style={styles.input}
            name  = "password"
            label = "password"
            type  = "password"
            value={this.state.credentials.password}
            onChange={this.onChange}
          />
          <input
            style={styles.btnLogin}
            type      = "submit"
            className = "btn btn-primary"
            value     = "Login"
            onClick={this.onSave}
          />
          <Link to="/sign-up">Sign-up</Link> 
        </form>   
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.user.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logInUser: (data) => dispatch(actions.logInUser(data))
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);