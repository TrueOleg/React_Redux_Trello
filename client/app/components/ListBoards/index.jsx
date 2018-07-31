import React from 'react';   
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'; 
import Board from '../Board';

const ListBoards = (props) => {
  
    const { boards } = props;
    const comp = boards.map( 
                    (item) => 
                      <li key={item.id}><Link  to={{
                                                        pathname: '/boards',
                                                        search: `?id=${item.id}`, 
                                                        state: {...item}
                                                      }}
                                          >
                                          {item.title}
                                          </Link>
                      </li> );
    return (
        <div>
            <ul>
                {comp}
            </ul>
            
        </div>
    );
};

export default ListBoards;