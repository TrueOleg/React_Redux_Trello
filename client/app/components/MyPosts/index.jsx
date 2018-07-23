import React from 'react';   
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';  

import * as actions from '../../redux/actions/postsAction';
import ListPosts from '../ListPosts';


class MyPosts extends React.Component {

    componentDidMount() {
        this.props.getMyPosts();
    }
    
    render () {
        
        if (this.props.myPosts.length === 0) {
            return (
                    <div>
                        <h1>Myposts</h1>
                    </div>
                    );
        } else {
            return (
                <React.Fragment>
                <h1>MyPosts</h1>
                <ListPosts posts={this.props.myPosts}/>
                </React.Fragment>
            )
        }
        
        
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.user.isAuthenticated,
    myPosts: state.posts.myPosts
});

const mapDispatchToProps = (dispatch) => ({
    getMyPosts: () => dispatch(actions.getMyPosts())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPosts));