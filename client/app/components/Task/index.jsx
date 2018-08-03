import React from 'react';   
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';  

import * as actions from '../../redux/actions/postsAction';
import ListPosts from '../ListPosts';
import * as styles from '../style/Home'; 


class Task extends React.Component {

    
    
    render () {
        
        
            return (
                <div style={styles.task}>
                  <p>{this.props.task.title}</p>
                  <p>{this.props.task.content}</p>
                </div>  
            )
        
        
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.user.isAuthenticated,
    
});

const mapDispatchToProps = (dispatch) => ({
    
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));