import React from 'react';   
import { connect } from 'react-redux';

import User from '../User';

class FoundUsers extends React.Component {

    render() {

        const data = this.props.foundUsers;
        console.log('data', data)
        if (data!==undefined) {
            const users = data.map((item) => {
                return (<li key={item.name}><User  user={item} /></li>)
            });
            return (<ul>{ users }</ul>);
            } return null;

        }
    }



const mapStateToProps = (state) => {
    return {
        foundUsers: state.users.users
    };
  };

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(FoundUsers);