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
 * @TODO: start game
 */
class RoleArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			team: null,
			role: null,
      started: this.props.started,
      roleErrorMessage: [],
      windowErrorMessage: []
		};

    this.handleRoleChange = this.handleRoleChange.bind(this);
	}

  /**
   * handleRoleChange
   * Get the results of the role Dropdown List.  If there is an error, display
   * it.  Otherwise, add the team and role data.
   */
  handleRoleChange(data) {
    let state = {...this.state};
    state.team = data.team;
    state.role = data.role;
    if (data.errorMessage) {
      state.roleErrorMessage = ["Could not update role"];
    } else {
      state.roleErrorMessage = [];
    }

    // If all are set, then show the game!
    if (state.started && state.team && state.role){
      this.props.parentCallback(state);
    } else {
      this.setState(state);
    }
  }

	render() {
    const errorMessage = [].concat(
      this.state.roleErrorMessage,
      this.state.windowErrorMessage
    );
		if (!this.state.team || !this.state.role || !this.state.started) {
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
              <button type="submit" className="btn btn-primary">
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
