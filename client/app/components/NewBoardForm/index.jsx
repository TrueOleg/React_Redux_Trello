import React from 'react';   
import { connect } from 'react-redux';

import User from '../User';
import * as actions from '../../redux/actions/boardsActions'; 


class NewBoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newBoard: {title: ''},
        
      };
    this.addBoard = this.addBoard.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const newBoard = this.state.newBoard;
    newBoard[field] = event.target.value;
    return this.setState({newBoard: newBoard});
  }

  addBoard(event) {
    event.preventDefault();
    this.props.writeBoard(this.state.newBoard);
    this.setState({ newBoard: {title: ''}});
    this.props.hide(event);
  }

  render() {
    return (
      <form>
      <h1>New Board</h1>
      <p>Enter title</p>
      <input
        name="title"
        label="title"
        value={this.state.newBoard.title}
        onChange={this.onChange}
        />
      <br />
      <input
        type="submit"
        className="btn btn-primary"
        value="Create"
        onClick={this.addBoard}
        />
    </form>  
    )
      
  };
}
const mapStateToProps = (state) => {
    
  };

const mapDispatchToProps = (dispatch) => ({
  writeBoard: (data) => dispatch(actions.writeBoard(data))
});

export default connect(null, mapDispatchToProps)(NewBoardForm);