import React from 'react';   
import { connect } from 'react-redux';  

class Post extends React.Component {
    
    render () {
        
        const { post } = this.props;
            
        return (
            <ul>
                <li>{post.title}</li>
                <li>{post.content}</li>
                <li>{post["user.name"]}</li>
                <li>{post.date}</li>
            </ul>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);