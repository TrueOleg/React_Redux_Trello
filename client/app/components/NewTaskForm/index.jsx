import React from 'react';   
import { connect } from 'react-redux';

import User from '../User';
import * as actions from '../../redux/actions/tasksAction'; 
import * as styles from '../style/Home'; 


class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newTask: {title: '', content: ''},
        
      };
    this.addTask = this.addTask.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {this.hideList(e)});
    this.form = document.getElementById('formTask'); 
  }
  
  hideList(e) {
    const form = this.form;
    if (form && !form.contains(e.target)) {
        this.props.hideForm();
      }
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
    this.props.hideForm();
  }
  

  render() {
    return (
    <form style={styles.form} id='formTask'>
      <h1>New Task</h1>
      <p>Enter title</p>
      <input
        style={styles.input}
        name="title"
        label="title"
        value={this.state.newTask.title}
        onChange={this.onChange}
        />
      <br />
      <p>Enter content</p>
      <input
        style={styles.input}
        name="content"
        label="content"
        value={this.state.newTask.content}
        onChange={this.onChange}
        />
      <br />
      <input
        style={styles.btnGenLink}
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
  writeTask: (data, status, boardId) => dispatch(actions.writeTask(data, status, boardId))
});

export default connect(null, mapDispatchToProps)(NewTaskForm);