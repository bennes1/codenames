import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * TypeDDL
 * This is the dropdownlist for the type.  Type is Pictures, Words, or Both.
 */
class TypeDDL extends React.Component {

  /**
   * constructor
   * Sets up the defaults.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: 'Please select a type'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * shouldComponentUpdate
   * Only update when the text changes.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.text !== this.state.text;
  }

  /**
   * handleClick
   * Changes the dropdownlist and notifies the parent form.
   */
  handleClick(event) {
    let state = {text: event.target.text};
    switch (state.text) {
      case "Pictures":
        state.value = "P";
        break;
      case "Words":
        state.value = "W";
        break;
      case "Both":
        state.value = "B";
        break;
      default:
        state.text = "";
        state.value = "";
    }
    this.setState(state);
    this.props.parentCallback(state);
  }

  /**
   * render
   * Renders the dropdownlist.
   */
  render() {
    return (
      <Dropdown id="typeDDL">

        <Dropdown.Toggle variant="success">
          {this.state.text}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={this.handleClick}>
            Pictures
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleClick}>
            Words
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handleClick}>
            Both
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default TypeDDL;

