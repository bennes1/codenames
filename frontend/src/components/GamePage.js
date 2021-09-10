import React from 'react';
import GameArea from './GameArea';
import ErrorAlert from './ErrorAlert';
const URI = require("urijs");

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
      let url = URI("/api/findGame")
      	.query({gameid: gameid});

      const requestMetadata = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(url, requestMetadata)
        .then(res => res.json())
        .then(results => {
          let state = {...this.state};
          state.dataLoaded = true;
          state.gameid = gameid;
          if (results.status !== "000") {
          	state.errorMessage = "Error occurred.";
          } else {
          	if (!results.found || results.found != gameid) {
          		state.errorMessage = "Game was not found.";
          	}
          }
          this.setState(state);
        }).catch(e => {
          let state = this.state;
          state.dataLoaded = true;
          state.errorMessage = "Could not connect to the database.";

          this.setState(state);
        });
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

