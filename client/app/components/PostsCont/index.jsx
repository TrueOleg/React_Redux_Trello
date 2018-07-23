import React from 'react';   
import { Redirect } from 'react-router';
import { connect } from 'react-redux'; 

import MyPosts from '../MyPosts';
import AllPosts from '../AllPosts';
import NewPost from '../NewPost';

class PostsCont extends React.Component {

    render () {
        return (
            <div>
              <MyPosts />
              <AllPosts />
              <NewPost />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated
    };
  };

export default connect(mapStateToProps, null)(PostsCont);