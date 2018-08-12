import React from 'react';   
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';  

import * as actions from '../../redux/actions/tasksAction'; 
import * as styles from '../style/Home'; 


class Task extends React.Component {
    constructor(props) {
        super(props);
        
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask() {
        this.props.deleteTask(this.props.task.id, this.props.boardId);
    };
    
    render () {
        
        
            return (
                <div style={styles.task}>
                    <p>{this.props.task.title}</p>
                    <p>{this.props.task.content}</p>
                    <input
                        style={styles.btnLogin}
                        type="submit"
                        value="✖"
                        onClick={this.deleteTask}
                    />
                </div>  
            )
        
        
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.user.isAuthenticated,
    
});

const mapDispatchToProps = (dispatch) => ({
    deleteTask: (taskId, boardId) => dispatch(actions.deleteTask(taskId, boardId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));