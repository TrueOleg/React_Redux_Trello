import React from 'react';   
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';  

import * as actions from '../../redux/actions/postsAction';
import ListPosts from '../ListPosts';


class Task extends React.Component {

    
    
    render () {
        
        
            return (
                <div>
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