import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import api from '../includes/api';

/**
 * RoleDDL
 * This is a dropdownlist to select the role.  This is updated immediately in
 * the database.
 *
 * @TODO: Make it more colorful and possibly with a meeple.
 */
class RoleDDL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Please select a role',
      team: null,
      role: null,
      roleid: null,
      errorMessage: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.text !== this.state.text;
  }

  /**
   * handleClick
   * Set the team and role based on the role selected.  Update database.
   */
  handleClick(event) {
    let state = {...this.state};
    state.text = event.target.text;
    switch(state.text) {
      case "Red Codemaster":
        state.team = "R";
        state.role = "M";
        break;
      case "Blue Codemaster":
        state.team = "B";
        state.role = "M";
        break;
      case "Red Player":
        state.team = "R";
        state.role = "P";
        break;
      case "Blue Player":
        state.team = "B";
        state.role = "P";
        break;
      default:
        state.text = "";
        state.team = null;
        state.role = null;
        break;
    }
    if (this.text !== state.text) {
      api.post("upsertRole", {
          team: state.team,
          role: state.role,
          roleid: state.roleid,
          gameid: this.props.gameid
        },
        (data) => {
          let newState = {...this.state};
          newState.roleid = data;
          newState.errorMessage = null;
          this.setState(newState);
          this.props.parentCallback(newState);
        },
        (error) => {
          let newState = {...this.state};
          newState.errorMessage = error;
          this.setState(newState);
          this.props.parentCallback(newState);
        }
      );
      this.setState(state);
    }

  }

  render() {
    return (
      <Dropdown id="roleDDL">

        <Dropdown.Toggle variant="success">
          {this.state.text}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={this.handleClick}>
            Red Codemaster
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleClick}>
            Red Player
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleClick}>
            Blue Codemaster
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleClick}>
            Blue Player
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
export default RoleDDL;
