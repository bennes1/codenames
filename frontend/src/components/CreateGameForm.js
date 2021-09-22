import React from 'react';
import TypeDDL from './TypeDDL';
import {Container, Row, Col} from 'react-bootstrap';
import { withRouter } from "react-router";
import ErrorAlert from './ErrorAlert';
import '../css/form.css';
import Api from './Api';

/**
 * CreateGameForm
 * This component creates the game based on the options specified.
 * If there is an error, an alert is created and shown.
 * Otherwise, it redirects to the game that was created.
 */
class CreateGameForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: '',
      size: '',
      errorMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  /**
   * handleTypeChange
   * This receives the change from the dropdownlist and applies it to the form.
   * @param data -- values from the dropdownlist component
   */
  handleTypeChange(data) {
    let state = {...this.state};
    state.type = data.value;
    // Right now keep size to "official" rules but it could change later.
    state.size = state.type === "word" ? "5x5" : "5x4";
    state.errorMessage = '';
  	this.setState(state);
  }

  /**
   * handleSubmit
   * On submit, check for errors.  If there are errors, stop.  If there aren't
   * errors, initialize the game.  Display errors if not successful.  Otherwise,
   * redirect to newly created game.
   */
  handleSubmit(event) {
    event.preventDefault();

    const errorMessage = this.checkErrors();
    if (errorMessage) {
      this.setErrorMessage(errorMessage);
    } else {
      Api.post("initializeGame", {
          type: this.state.type,
          size: this.state.size
        },
        (data) => {
          const { history } = this.props;
          history.push("/" + data);
        },
        (error) => {
          this.setErrorMessage(error);
        }
      );
    }
  }

  /**
   * setErrorMessage
   * Apply changes to error message inside the "state" object for the form.
   */
  setErrorMessage(errorMessage) {
    let state = {...this.state};
    state.errorMessage = errorMessage;
    this.setState(state);
  }

  /**
   * checkErrors
   * If there are any errors, display that error.  Otherwise, return nothing.
   */
  checkErrors() {
    if (!this.state.type) {
      return "Please select type.";
    }

    return "";
  }

  render() {
    return (
      <form onSubmit = {this.handleSubmit} id="createGameForm">
        <Container>
          <Row>
            <Col>
              <ErrorAlert errorMessage={this.state.errorMessage} />
            </Col>
          </Row>
          <Row>
            <Col>
              <TypeDDL parentCallback = {this.handleTypeChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <button type="submit" className="btn btn-primary"
                style={{width: "100%"}}>
                  Submit
              </button>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

CreateGameForm = withRouter(CreateGameForm);
export default CreateGameForm;
