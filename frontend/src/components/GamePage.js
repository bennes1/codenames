import React from 'react';
import GameArea from './GameArea';
import RoleArea from './RoleArea';
import Loading from './Loading';
import api from '../includes/api';

/**
 * GamePage
 * This is a control for page flow for the game.
 * First, check if the game exists.
 * If it does, then show game.
 */
class GamePage extends React.Component {

  /**
   * constructor
   * Set up defaults of false and null.  Bind the setRole to this class.
   */
	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: false,
			errorMessage: '',
			gameid: null,
      role: null,
      started: null
		};
		this.setRole = this.setRole.bind(this);
	}

	/**
	 * componentDidMount
	 * After the component is mounted, pull the gameid from the URL and see
	 * if it is valid.
	 */
	componentDidMount() {

		let gameid = this.props.location.pathname;
  	gameid = gameid.split("/")[1];
  	api.get("findGame",
	  	{gameid: gameid},
	  	(data) => {
	  		let state = {...this.state};
	  		state.dataLoaded = true;
	  		state.gameid = gameid;
	      	if (!data || data !== gameid) {
	      		state.errorMessage = "Game was not found.";
	      	}
	      	this.setState(state);
	  	}
    );
  }

  /**
   * setRole
   * Set the role information from the RoleArea.  At this point, role, team, and
   * started should have all values and that is then passed to the GameArea.
   */
  setRole(data) {
  	let state = {...this.state};
    state.role = data.role;
    state.started = data.started
  	this.setState(state);
  }

  /**
   * render
   * Render GamePage.  If has not found game or game doesn't exist, display
   * error.  Otherwise, if game isn't started or role info doesn't exist, go to
   * RoleArea.  Otherwise, go to GameArea.
   */
	render() {

		return (
			<Loading
				errorMessage={this.state.errorMessage}
				dataLoaded={this.state.dataLoaded}
			>
			{!this.state.role || !this.state.started ?
				<RoleArea
					gameid={this.state.gameid}
          started={this.state.started}
					parentCallback={this.setRole}
				/> :
				<GameArea
					gameid={this.state.gameid}
					role={this.state.role}
				/>}
			</Loading>
		);
	}
}

export default GamePage;
