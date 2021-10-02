import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import RoleDDL from './RoleDDL';
import ErrorAlert from './ErrorAlert';

import '../css/game.css';

import api from '../includes/api';

/**
 * RoleArea
 * This is for selecting the game role and then starting the game.
 *
 * @TODO: expand the waiting area
 */
class RoleArea extends React.Component {

  /**
   * constructor
   * Set up defaults and bind event functions to this component.
   */
	constructor(props) {
		super(props);
		this.state = {
      role: null,
      started: this.props.started,
      roleErrorMessage: [],
      windowErrorMessage: []
		};

    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
	}

  /**
   * handleRoleChange
   * Get the results of the role Dropdown List.  If there is an error, display
   * it.  Otherwise, add the team and role data.
   */
  handleRoleChange(data) {
    let state = {...this.state};
    state.role = data.role;
    if (data.errorMessage) {
      state.roleErrorMessage = ["Could not update role"];
    } else {
      state.roleErrorMessage = [];
    }

    // If all are set, then show the game!
    if (state.started && state.role){
      this.props.parentCallback(state);
    } else {
      this.setState(state);
    }
  }

  /**
   * handleStart
   * When the start button is clicked, verify roles and then start the game.
   */
  handleStart() {
    api.post("startGame",
      {gameid: this.props.gameid},
      (data) => {
        let state = {...this.state};
        state.started = data;
        // If all are set, then show the game!
        if (state.started && state.role){
          this.props.parentCallback(state);
        } else {
          this.setState(state);
        }
      },
      (error) => {
        let state = {...this.state};
        state.windowErrorMessage = error;
        this.setState(state);
      }
    );
  }

  /**
   * render
   * Renders the RoleArea.
   */
	render() {
    const errorMessage = [].concat(
      this.state.roleErrorMessage,
      this.state.windowErrorMessage
    );
		if (!this.state.role || !this.state.started) {
			return (
				<Container>
          {errorMessage.length > 0 &&
            <Row>
              <Col>
                <ErrorAlert errorMessage={errorMessage} />
              </Col>
            </Row>
          }
          <Row>
            <Col>
              <RoleDDL
                parentCallback={this.handleRoleChange}
                gameid={this.props.gameid}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="roleWindow">

              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <button className="btn btn-primary" onClick={this.handleStart}>
                  Start Game
              </button>
            </Col>
          </Row>
				</Container>
			);
		}

		return null;
	}
}

export default RoleArea;
