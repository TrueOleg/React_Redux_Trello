import React from 'react';   
import { connect } from 'react-redux';

import User from '../User';
import * as actions from '../../redux/actions/tasksAction'; 


class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newTask: {title: '', content: ''},
        
      };
    this.addTask = this.addTask.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const newTask = this.state.newTask;
    newTask[field] = event.target.value;
    return this.setState({newTask: newTask});
  }

  addTask(event) {
    event.preventDefault();
    this.props.writeTask(this.state.newTask, this.props.status, this.props.boardId);
    this.setState({ newTask: {title: '', content: ''}});
    this.props.hide(event);
  }

  render() {
    return (
      <form>
      <h1>New Task</h1>
      <p>Enter title</p>
      <input
        name="title"
        label="title"
        value={this.state.newTask.title}
        onChange={this.onChange}
        />
      <br />
      <p>Enter content</p>
      <input
        name="content"
        label="content"
        value={this.state.newTask.content}
        onChange={this.onChange}
        />
      <br />
      <input
        type="submit"
        className="btn btn-primary"
        value="Create"
        onClick={this.addTask}
        />
    </form>  
    )
      
  };
}
const mapStateToProps = (state) => {
    
  };

const mapDispatchToProps = (dispatch) => ({
  writeTask: (data, status, id) => dispatch(actions.writeTask(data, status, id))
});

export default connect(null, mapDispatchToProps)(NewTaskForm);