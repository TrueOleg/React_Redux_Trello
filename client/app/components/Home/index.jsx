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
import * as usersActions from '../../redux/actions/searchUsers';  
import FoundUsers from '../FoundUsers';
import BoardsContainer from '../BoardsContainer';


class Home extends React.Component {
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

        const list = this.state.isOpen ? <FoundUsers /> : null;
        
        return (
                <div>
                    <h1 style={styles.h1}>Trello</h1>
                    <button onClick={this.logOut}>Log-out</button>
                    <div id="sharing">
                        <input />
                        <button onClick={this.generateLink}>Generate Link</button>   
                    </div>
                    <br />
                    <BoardsContainer />
                </div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);