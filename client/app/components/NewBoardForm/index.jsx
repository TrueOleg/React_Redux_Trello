import React from 'react';   
import { connect } from 'react-redux';

import User from '../User';
import * as actions from '../../redux/actions/boardsActions'; 
import * as styles from '../style/Home'; 


class NewBoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newBoard: {title: ''},
        
      };
    this.addBoard = this.addBoard.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    
    document.addEventListener('click', (e) => {this.hideList(e)});
    this.form = document.getElementById('form'); 
  }

  hideList(e) {
    const form = this.form;
    if (form && !form.contains(e.target)) {
        this.props.hideForm();
      }
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
      <form style={styles.form} id='form'>
        <h1>New Board</h1>
        <p>Enter title</p>
        <input
          style={styles.input}
          name="title"
          label="title"
          value={this.state.newBoard.title}
          onChange={this.onChange}
          />
        <br />
        <input
          style={styles.btnGenLink}
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