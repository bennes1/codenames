import React from 'react';
import GameGrid from './GameGrid';
import '../css/game.css';
import api from '../includes/api';
import Loading from './Loading';

/**
 * GameArea
 * This organizes the game components once the game is started.
 */
class GameArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      grid: null
    };
    this.initialGridData = null;
    this.gridAssetData = null;
  }

  /**
   * componentDidMount
   * After the component mounts, retrieve data for the grid which is assetid,
   * color, and if the picture/word was guessed.
   */
  componentDidMount() {

    api.get("retrieveGameInitial", {
        gameid: this.props.gameid,
        role: this.props.role,
        team: this.props.team
      },
      (data) => {
        let state = {...this.state};
        state.errorMessage = '';
        this.initialGridData = data.grid;
        const [dataLoaded, grid] = this.combineGrids();
        state.dataLoaded = dataLoaded;
        state.grid = grid;

        // Other data found in the main data load.
        state.rowSize = data.rowSize;
        this.setState(state);
      },
      (error) => {
        this.setErrorMessage(error);
      }
    );

    api.get("retrieveGameAssets", {
        gameid: this.props.gameid
      },
      (data) => {
        let state = {...this.state};
        state.errorMessage = '';
        this.gridAssetData = data;
        const [dataLoaded, grid] = this.combineGrids();
        state.dataLoaded = dataLoaded;
        state.grid = grid;
        this.setState(state);
      },
      (error) => {
        this.setErrorMessage(error);
      }
    );
  }

  getChanges() {
    api.get("retrieveGameChanges", {
        gameid: this.props.gameid,
        role: this.props.role,
        team: this.props.team
      },
      (data) => {
        let state = {...this.state};
        state.errorMessage = '';
        state.grid = data.grid;
        this.setState(state);
      },
      (error) => {
        this.setErrorMessage(error);
      }
    );
  }

  combineGrids() {
    let grid = null, dataLoaded = false;
    if (this.gridAssetData && this.initialGridData) {
      grid = this.initialGridData.map((elem, index) => {
        elem.asset = this.gridAssetData[index];
        return elem;
      });
      dataLoaded = true;
      delete this.gridAssetData;
      delete this.initialGridData;

      // Set up timer to get changes
      this.timerID = setInterval(
        () => this.getChanges(),
        1000
      );
    }
    return [dataLoaded, grid];
  }

  setErrorMessage(error) {
    let state = {...this.state};
    state.errorMessage = error;
    this.setState(state);
  }

	render() {
		return (
      <Loading
        errorMessage={this.state.errorMessage}
        dataLoaded={this.state.dataLoaded}
      >
  			<div className="game">
  				<GameGrid
            grid={this.state.grid}
            rowSize={this.state.rowSize}
            role={this.props.role}
            team={this.props.team}

            // Still need this for tryGuess!
            gameid={this.props.gameid}
          />
          <div id="gameLog"></div>
          <div id="gameTurn"></div>
  			</div>
      </Loading>
		);
	}
}

export default GameArea;
