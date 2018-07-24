import React from 'react';   
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'; 


const ListBoards = (props) => {
  
    const { boards } = props;
    const comp = boards.map( 
                    (item) => 
                      <li key={item.title}><Link  to={{
                                                        pathname: '/boards',
                                                        search: `?id=${item.id}`,
                                                        hash: '#the-hash',
                                                        state: { fromDashboard: true }
                                                      }}
                                          >
                                          {item.title}
                                          </Link>
                      </li> );
    return (
        <div>
            <ul>{comp}</ul>
            
        </div>
    );
};

export default ListBoards;