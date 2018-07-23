import React from 'react';  
import { connect } from 'react-redux';  


import * as usersActions from '../../redux/actions/searchUsers';  
import starOne from '../../img/star (1).png';
import starTwo from '../../img/star (2).png';


class User extends React.Component {

    click = () => {
        this.props.user["Following.followers.id"] 
        ? this.props.unsubscribe(this.props.user.id, this.props.char)
        : this.props.subscribe(this.props.user.id, this.props.char);
    }
    
    
    

    render () {
        const image = this.props.user["Following.followers.id"] ? starTwo: starOne;
        return (
            <p onClick={this.click}>{this.props.user.name}<img onClick={this.click} src={image}/></p>
        );
    }
}


const mapStateToProps = (state) => {
    return {
      char: state.users.data
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        subscribe: (id, char) => dispatch(usersActions.subscribe(id, char)),
        unsubscribe: (id, char) => dispatch(usersActions.unsubscribe(id, char))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);