import React from 'react';   
import { Redirect } from 'react-router';
import { connect } from 'react-redux';  

import * as actions from '../../redux/actions/postsAction';
import ListPosts from '../ListPosts';

class FriendsPosts extends React.Component {
    
    componentDidMount() {
        this.props.getFriendsPosts()
    }

    render () {
        if (this.props.friendsPosts.length === 0) {
            return (
                    <div>
                        <h1>There is no posts. Please subscribe for someone.</h1>
                    </div>
                    );
        } else {
            return (
                <React.Fragment>
                    <h1>FriendsPosts</h1>
                    <ListPosts posts={this.props.friendsPosts}/>
                </React.Fragment>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        friendsPosts: state.posts.friendsPosts

    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        getFriendsPosts: () => dispatch(actions.getFriendsPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPosts);