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
import NewBoardForm from '../NewBoardForm';
import BackLogList from '../BackLogList';
import ToDoList from '../ToDoList';
import DoneList from '../DoneList';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            tasks: {
                backLog: [],
                toDo: [],
                done: []
            }
           
        };
        
    }

    componentDidMount() {
        // this.props.getTasks();
        
    }

    
    
    
    render () {
        
      
      return (
          <div>
              <h3>{this.props.board.title}</h3>
              <React.Fragment>
                <BackLogList boardId={this.props.board.id}/>
                <ToDoList boardId={this.props.board.id}/>
                <DoneList boardId={this.props.board.id}/>
              </React.Fragment>  
          </div>
      );
        
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        // myTasks: state.tasks.myTasks
    };
  };

const mapDispatchToProps = (dispatch) => ({
    // getTasks: () => dispatch(tasksActions.getTasks()),

    
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);