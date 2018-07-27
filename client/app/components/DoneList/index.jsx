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


class DoneList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
           
        };
        
    }

    componentDidMount() {
       
        
    }

    
    
    
    render () {
        
      
      return (
          <div>
              <h3>DoneList</h3>
              
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

export default connect(mapStateToProps, mapDispatchToProps)(DoneList);