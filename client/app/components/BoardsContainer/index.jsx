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
import NewBoardForm from '../NewBoardForm';
import ListBoards from '../ListBoards';

class BoardsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            isOpen: false
        };
        this.showNewBoardForm = this.showNewBoardForm.bind(this);
    }

    componentDidMount() {
       this.props.getBoards();
        
    }

    showNewBoardForm(event) {
        event.preventDefault();
        
        this.setState({ isOpen: !this.state.isOpen});
    }
    
    
    render () {
        
        const form = this.state.isOpen ? <NewBoardForm hide={this.showNewBoardForm}/> : <button onClick={this.showNewBoardForm}>Add Board</button>;
        if (this.props.myBoards === 0) {
            return (
                <div>
                    <h2>List Boards</h2>
                    <ul>
                        <li>{form}</li>
                    </ul>
                </div> 
            );    
        } else {
            return (
                <div>
                    <h2>List Boards</h2>
                    <ul>
                        <ListBoards boards={this.props.myBoards}/> 
                        <li>{form}</li>
                    </ul>
                    <ViewBoards boards={this.props.myBoards}/>
                </div> 
            );    
        }
        
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.user.isAuthenticated,
        myBoards: state.boards.myBoards
    };
  };

const mapDispatchToProps = (dispatch) => ({
    
    getBoards: () => dispatch(boardsActions.getBoards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardsContainer);