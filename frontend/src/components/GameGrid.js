import React from 'react';
import MasterAsset from './MasterAsset';
import PlayerAsset from './PlayerAsset';
import {Container, Row, Col} from 'react-bootstrap';
const URI = require("urijs");

/**
 * GameGrid
 * Constructs the grid based on the assets used in the game.
 * It contains fetchers for loading the grid and pulling guesses in the game.
 *
 * @TODO: Add fetcher to pull any new guesses in the game.
 */
class GameGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: false,
			type: "",
			starter: "blue",
			grid: [],
			errorMessage: ""
		};
	}

	/**
	 * componentDidMount
	 * After the component mounts, retrieve data for the grid which is assetid,
	 * color, and if the picture/word was guessed.
	 */
	componentDidMount() {

      let url = URI("/api/retrieveGameGrid")
      	.query({
      		gameid: this.props.gameid,
      		role: this.props.role
      	});

      const requestMetadata = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(url, requestMetadata)
        .then(res => res.json())
        .then(results => {
          let state = this.state;
          state.dataLoaded = true;
          if (results.status !== "000") {
          	state.errorMessage = results.error.toString();
          } else {
          	state.errorMessage = '';
          	state.type = results.gameData.type;
          	state.starter = results.gameData.starter;
          	state.grid = results.gameData.grid;
          }
          this.setState(state);
        }).catch(e => {
          this.setErrorMessage("Could not connect to database.");
          console.log(e);
        });
    }

  /**
   * render
   * Renders the grid.  If the user is a codemaster, then use MasterAssets,
   * otherwise use PlayerAssets.
   */
	render() {
		if (!this.state.dataLoaded) {
			return (
				<h1> Loading </h1>
			);
		}

		return (
			<div className="gamegrid">
				<Container>
					{this.state.grid.map((items, yindex) => {
						return (
							<Row key={yindex}>
								{items.map((element, xindex) => {
									if (this.props.role === "M") {
										return (
											<Col key={xindex}>
												<MasterAsset
													cover={element.cover}
													color={element.color}
													type={element.type}
													assetid={element.assetid}
												/>
											</Col>
										)
									} else {
										return (
											<Col key={xindex}>
												<PlayerAsset
													cover={element.cover}
													type={element.type}
													assetid={element.assetid}
													team={this.props.team}
												/>
											</Col>
										)
									}

								})}
							</Row>
						)
					})}
				</Container>
			</div>
		)
	}
}

export default GameGrid;
