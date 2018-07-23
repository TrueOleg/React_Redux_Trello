import React from 'react';   
import { Redirect } from 'react-router';
import { connect } from 'react-redux';  

import * as actions from '../../redux/actions/postsAction';


class NewPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {credentials: {title: '', content: ''}}
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
        this.props.writePost(this.state.credentials);
        this.setState({ credentials: {title: '', content: ''}})
      }
    
    render () {
        return (
            <form>
            <h1>New Post</h1>
            <p>Enter title</p>
            <input
              name="title"
              label="title"
              value={this.state.credentials.title}
              onChange={this.onChange}
              />
            <br />
            <p>Enter content</p>
            <textarea
              name="content"
              label="content"
              value={this.state.credentials.content}
              onChange={this.onChange}
              />
            <br />
            <input
              type="submit"
              className="btn btn-primary"
              value="Write"
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
        writePost: (data) => dispatch(actions.writePost(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);