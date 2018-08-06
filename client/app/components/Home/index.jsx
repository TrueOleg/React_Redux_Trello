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

        
        
        return (
            <React.Fragment>
                
                    <div style={styles.header}>
                        <h1 style={styles.h1}>Trello</h1>
                        <button onClick={this.logOut} style={styles.btnLogOut}>Log-out</button>    
                    </div>
                    <div style={styles.sharing}>
                            <input style={styles.inputSharing} />
                            <button onClick={this.generateLink} style={styles.btnGenLink}>Generate Link</button>   
                    </div>
                    <BoardsContainer {...this.props}/>
               
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);