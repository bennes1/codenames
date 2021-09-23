import React from 'react';
import GameArea from './GameArea';
import Loading from './Loading';
import api from '../includes/api';

/**
 * GamePage
 * This is a control for page flow for the game.
 * First, check if the game exists.
 * If it does, then show game.
 *
 * @TODO: Add another set of components for setting roles & starting game.
 */
class GamePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: false,
			errorMessage: '',
			gameid: null,

			// Hard-coded for now
			team: "R",
			role: "P"
		};
	}

	/**
	 * componentDidMount
	 * After the component is mounted, pull the gameid from the URL and see if it
	 * is valid.
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

	render() {

		return (
			<Loading
				errorMessage={this.state.errorMessage}
				dataLoaded={this.state.dataLoaded}
			>
					<GameArea
						gameid={this.state.gameid}
						team={this.state.team}
						role={this.state.role}
					/>
			</Loading>
		);
	}
}

export default GamePage;

