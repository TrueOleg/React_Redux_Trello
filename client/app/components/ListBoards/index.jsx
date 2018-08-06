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
                    (item) =>   <Link  
                                    style={styles.linkBoard}
                                    key={item.id}
                                    to={{
                                        pathname: '/boards',
                                        search: `?id=${item.id}`, 
                                        state: {...item}
                                        }}
                                >
                                {item.title}
                                </Link>
                      );
    return (
        
            <React.Fragment>
                {comp}
            </React.Fragment>    
        
    );
};

export default ListBoards;