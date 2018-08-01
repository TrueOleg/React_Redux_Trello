import React from 'react';   
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'; 
import Board from '../Board';
import * as styles from '../style/Home'; 


const ListBoards = (props) => {
  
    const { boards } = props;
    const comp = boards.map( 
                    (item) => 
                      <li style={styles.li} key={item.id}><Link  to={{
                                                        pathname: '/boards',
                                                        search: `?id=${item.id}`, 
                                                        state: {...item}
                                                      }}
                                          >
                                          {item.title}
                                          </Link>
                      </li> );
    return (
        // <div style={styles.list}>
        //     <ul>
            <React.Fragment>
                {comp}
            </React.Fragment>    
        //     </ul>
            
        // </div>
    );
};

export default ListBoards;