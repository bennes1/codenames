import React from 'react';
import MasterAsset from './MasterAsset';
import PlayerAsset from './PlayerAsset';
import {Container, Row, Col} from 'react-bootstrap';
const URI = require("urijs");

/**
 * GameGrid
 * Constructs the grid based on the assets used in the game.
 * It contains fetchers for loading the grid and pulling guesses in the game.
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
        let state = {...this.state};
        state.dataLoaded = true;
        if (results.status !== "000") {
        	state.errorMessage = results.error.toString();
        } else {
        	state.errorMessage = '';
        	state.grid = results.data.grid;
        	state.rowSize = results.data.rowSize;
        	state.lastid = results.data.lastid;
        }
        this.setState(state);
      }).catch(e => {
        this.setErrorMessage("Could not connect to database.");
        console.log(e);
      });

    // Set up timer to get more guesses
    this.timerID = setInterval(
    	() => this.getMoreGuesses(),
    	1000
    );
  }

  /**
   * componentWillUnmount
   * Need to clean up timer
   */
  componentWillUnmount() {
  	clearInterval(this.timerID);
  }

  /**
   * getMoreGuesses
   * Add to guesses as the game runs.
   */
  getMoreGuesses() {
    let url = URI("/api/getMoreGuesses")
    	.query({
    		gameid: this.props.gameid,
    		lastid: this.state.lastid
    	});

    const requestMetadata = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(results => {

      	let state = {...this.state};
      	if (results.status === '000') {
      		results.data.map((element, index) => {
      			if (index === 0) {
      				state.lastid = element._id;
      			}
      			const y = parseInt(element.position / state.rowSize);
      			const x = element.position % state.rowSize;
      			state.grid[y][x].cover = element.result;
      		});
      	}
      	this.setState(state);
      }).catch(e => {
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
											<Col key={element.key}>
												<MasterAsset
													cover={element.cover}
													color={element.color}
													type={element.type}
													assetid={element.assetid}
													index={element.key}
													gameid={this.props.gameid}
												/>
											</Col>
										)
									} else {
										return (
											<Col key={element.key}>
												<PlayerAsset
													cover={element.cover}
													type={element.type}
													assetid={element.assetid}
													team={this.props.team}
													index={element.key}
													gameid={this.props.gameid}
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
