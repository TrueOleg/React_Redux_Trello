import React from 'react';   
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';  

import * as styles from '../style/Home'; 
import * as Token from '../../servises/Token';
import * as actions from '../../redux/actions/authAction';
import BoardsContainer from '../BoardsContainer';


class Invait extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
            isOpen: false
        };
        
        const token   = localStorage.getItem('token');
            if (token) {
                props.setToken({
                    token
                });
            }
    }

    componentDidMount() {
       this.props.getInvaitBoard()
        
    }

   

    logOut() {
        Token.clearToken();
        location.reload();
    }

   
    
    render () {
        const token = localStorage.getItem('token');

        if (!this.props.isAuthenticated && !token) {
            return <Redirect to="/sign-in"/>;
        }

        const invaitBoard = this
        
        
        return (
            <React.Fragment>
                
                    <div style={styles.header}>
                        <h1 style={styles.h1}>Trello</h1>
                        <h2>Invait</h2>
                        <button onClick={this.logOut} style={styles.btnLogOut}>Log-out</button>    
                    </div>
                    
                    
               
            </React.Fragment>    
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        
    };
  };

const mapDispatchToProps = (dispatch) => ({
    setToken: (data) => dispatch(actions.isLogin(data)),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Invait);