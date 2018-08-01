import React from 'react';   
import { connect } from 'react-redux'; 
import { Redirect} from 'react-router'; 

import * as styles from '../style/SignUpPage';
import * as actions from '../../redux/actions/authAction';


class SignUpPage extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {credentials: {regLogin: '', regPass: '', regEmail: ''}}
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
    this.props.registrationUser(this.state.credentials);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>;
    }
    return (
        <form style = {styles.form}>
          <h1>Sign-up</h1>
          <p>Enter login</p>
          <input
            style = {styles.input}
            name  = "regLogin"
            label = "regLogin"
            value={this.state.credentials.regLogin}
            onChange={this.onChange}
            />
          <br />
          <p>Enter password</p>
          <input
            style = {styles.input}
            name  = "regPass"
            label = "regPass"
            type  = "regPass"
            value={this.state.credentials.regPass}
            onChange={this.onChange}
            />
          <br />
          <p>Enter email</p>
          <input
            style = {styles.input}
            name  = "regEmail"
            label = "regEmail"
            type  = "regEmail"
            value={this.state.credentials.regEmail}
            onChange={this.onChange}
            />
          <br />
          <input
            style     = {styles.btn}
            type      = "submit"
            className = "btn btn-primary"
            value     = "Registration"
            onClick={this.onSave}
            />
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
        registrationUser: (data) => dispatch(actions.registrationUser(data))
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);