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
import * as usersActions from '../../redux/actions/searchUsers';  
import NewBoardForm from '../NewBoardForm';

class BoardsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            isOpen: false
        };
        this.showNewBoardForm = this.showNewBoardForm.bind(this);
    }

    

    showNewBoardForm(event) {
        event.preventDefault();
        
        this.setState({ isOpen: !this.state.isOpen});
    }
    
    
    render () {

        const form = this.state.isOpen ? <NewBoardForm props={this.props.showNewBoardForm}/> : <button onClick={this.showNewBoardForm}>Add Board</button>;

        return (
                <div>
                    <ul>
                        <li>{form}</li>
                    </ul>

                    <hr/>

                    
                </div> 
        );
    }
}


const mapStateToProps = (state) => {
    return {
        
    };
  };

const mapDispatchToProps = (dispatch) => ({
    writeBoard: (data) => dispatch(actions.writeBoard(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsContainer);