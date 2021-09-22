import React from 'react';
import GameArea from './GameArea';
import ErrorAlert from './ErrorAlert';
import Api from './Api';

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
	  Api.get("findGame",
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
		if (!this.state.dataLoaded) {
			return (
				<h1> Loading </h1>
			);
		}
		if (this.state.errorMessage) {
			return (
				<ErrorAlert errorMessage={this.state.errorMessage} />
			);
		}

		return (
			<GameArea
				gameid={this.state.gameid}
				team={this.state.team}
				role={this.state.role}
			/>
		);
	}
}

export default GamePage;

