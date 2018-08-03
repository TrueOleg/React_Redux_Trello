import React from 'react';   
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';  
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import * as styles from '../style/Home'; 
import * as Token from '../../servises/Token';
import * as actions from '../../redux/actions/authAction'; 
import * as tasksActions from '../../redux/actions/tasksAction';  
import NewTaskForm from '../NewTaskForm';
import Task from '../Task';


class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isOpen: false, 
           status: 'todo'
        };
        this.showNewTaskForm = this.showNewTaskForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.boardId !== prevProps.boardId) {
            this.props.getTasks(this.props.boardId, this.state.status);
          }
    }
    
    componentDidMount() {
        // this.props.getTasks(this.props.boardId, this.state.status);
    }

    hideForm() {
        this.setState({
        isOpen: false
        });
    }

    showNewTaskForm(event) {
        event.preventDefault();
        
        this.setState({ isOpen: !this.state.isOpen});
    }
    onDragEnd = result => {
        
    };
    
    render () {
        
        const form = this.state.isOpen 
                    ? <NewTaskForm 
                        hideForm={this.hideForm}
                        hide={this.showNewTaskForm} 
                        status={this.state.status} 
                        boardId={this.props.boardId}
                    /> 
                    : <button onClick={this.showNewTaskForm} style={styles.btnAdd}>Add Task</button>;
        const tasks = this.props.toDoTasks !== 0 
                    ? this.props.toDoTasks.map(
                                            (item, index) => 
                                                <Draggable  
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <li 
                                                            key={item.id} 
                                                            style={styles.li} 
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Task task={item} />
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )
                    : null;  
      return (
          <Droppable droppableId={this.state.status}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={styles.tasksList}>
                    <h3 style={styles.h3}>ToDo</h3>
                    {form}
                    {tasks}
                    {provided.placeholder}   
                </div>
              )}
          </Droppable>
      );
        
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        toDoTasks: state.tasks.toDoTasks
    };
  };

const mapDispatchToProps = (dispatch) => ({
    getTasks: (boardId, status) => dispatch(tasksActions.getTasks(boardId, status)),    
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);