import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * TypeDDL
 * This is the dropdownlist for the type.  Type is Pictures, Words, or Both.
 */
class TypeDDL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: 'Please select a type'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value != this.state.value;
  }

  handleClick(event) {
    let state = {text: event.target.text};
    switch (state.text) {
      case "Pictures":
        state.value = "picture";
        break;
      case "Words":
        state.value = "word";
        break;
      case "Both":
        state.value = "both";
        break;
      default:
        state.text = "";
        state.value = "";
    }
    this.setState(state);
    this.props.parentCallback(state);
  }

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

