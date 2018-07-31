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
import * as tasksActions from '../../redux/actions/tasksAction';  
import NewTaskForm from '../NewTaskForm';
import Task from '../Task';


class DoneList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isOpen: false, 
           status: 'done'
        };
        this.showNewTaskForm = this.showNewTaskForm.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.boardId !== prevProps.boardId) {
            this.props.getTasks(this.props.boardId, this.state.status);
          }
    }
    
    componentDidMount() {
        this.props.getTasks(this.props.boardId, this.state.status);
    }

    showNewTaskForm(event) {
        event.preventDefault();
        
        this.setState({ isOpen: !this.state.isOpen});
    }
    
    
    render () {
        
      const form = this.state.isOpen 
                    ? <NewTaskForm 
                        hide={this.showNewTaskForm} 
                        status={this.state.status} 
                        boardId={this.props.boardId}
                    /> 
                    : <button onClick={this.showNewTaskForm}>Add Task</button>;
      const tasks = this.props.doneTasks !== 0 
                    ? this.props.doneTasks.map(
                                                (item) => 
                                                <li key={item.id}>
                                                    <Task task={item} />
                                                </li>
                                                )
                    : null;  
      return (
          <div>
              <h3>Done</h3>
              {form}
              {tasks}
          </div>
      );
        
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        doneTasks: state.tasks.doneTasks
    };
  };

const mapDispatchToProps = (dispatch) => ({
    getTasks: (boardId, status) => dispatch(tasksActions.getTasks(boardId, status)),    
});

export default connect(mapStateToProps, mapDispatchToProps)(DoneList);