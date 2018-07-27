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
import * as boardsActions from '../../redux/actions/boardsActions';  
import NewTaskForm from '../NewTaskForm';


class BackLogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isOpen: false, 
           status: 'backLog'
        };
        this.showNewTaskForm = this.showNewTaskForm.bind(this);
    }

    componentDidMount() {
       
        
    }

    showNewTaskForm(event) {
        event.preventDefault();
        
        this.setState({ isOpen: !this.state.isOpen});
    }
    
    
    render () {
        
      const form = this.state.isOpen ? <NewTaskForm hide={this.showNewTaskForm} status={this.state.status}/> : <button onClick={this.showNewTaskForm}>Add Task</button>;

      return (
          <div>
              <h3>BackLog</h3>
              {form}
          </div>
      );
        
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        
    };
  };

const mapDispatchToProps = (dispatch) => ({
    
    
});

export default connect(mapStateToProps, mapDispatchToProps)(BackLogList);