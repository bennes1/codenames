import React from 'react';
import MasterAsset from './MasterAsset';
import PlayerAsset from './PlayerAsset';
import {Container, Row, Col} from 'react-bootstrap';
import api from '../includes/api';
import Loading from './Loading';

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

		api.get("retrieveGameGrid", {
	    	gameid: this.props.gameid,
	    	role: this.props.role
			},
			(data) => {
				let state = {...this.state};
				state.dataLoaded = true;
      	state.errorMessage = '';
      	state.grid = data.grid;
      	state.rowSize = data.rowSize;
      	state.lastid = data.lastid;
      	this.setState(state);
			},
			(error) => {
				this.setErrorMessage(error);
			}
		);

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
  	api.get("getMoreGuesses", {
    		gameid: this.props.gameid,
    		lastid: this.state.lastid
			},
			(data) => {
				let state = {...this.state};
  			data.map((element, index) => {
    			if (index === 0) {
    				state.lastid = element._id;
    			}
    			const y = parseInt(element.position / state.rowSize);
    			const x = element.position % state.rowSize;
    			state.grid[y][x].cover = element.result;
    			return null;
    		});

    		this.setState(state);
			},
			(error) => {
				this.setErrorMessage(error);
			}
		);
  }

  /**
   * setErrorMessage
   * Apply changes to error message inside the "state" object for the form.
   */
  setErrorMessage(errorMessage) {
  	clearInterval(this.timerID);
    this.setState({
    	dataLoaded: true,
    	errorMessage: errorMessage
    });
  }

  /**
   * render
   * Renders the grid.  If the user is a codemaster, then use MasterAssets,
   * otherwise use PlayerAssets.
   */
	render() {

		return (
			<Loading
				errorMessage={this.state.errorMessage}
				dataLoaded={this.state.dataLoaded}
			>
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
			</Loading>
		)
	}
}

export default GameGrid;
