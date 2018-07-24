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

class ViewBoards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
           
        };
        
    }

    componentDidMount() {
       
        
    }

    
    
    
    render () {
        
      const { boards } = props;
      const comp = boards.map( 
                      (item) => 
                        <li key={item.title}><Route  to={{
                                                          pathname: '/boards',
                                                          search: `?id=${item.id}`,
                                                          hash: '#the-hash',
                                                          state: { fromDashboard: true }
                                                        }}
                                                        component={Board}  
                                            />
                                            
                        </li> );
      return (
          <div>
              <ul>{comp}</ul>
              
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewBoards);