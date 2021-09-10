import React from 'react';
import GameGrid from './GameGrid';
import GameLog from './GameLog';
import '../css/game.css';

/**
 * GameArea
 * This organizes the game components once the game is started.
 */
class GameArea extends React.Component {

	render() {
		return (
			<div className="game">
				<GameGrid
					gameid={this.props.gameid}
					role={this.props.role}
					team={this.props.team}
				/>
				<GameLog
					gameid={this.props.gameid}
					team={this.props.team}
				/>
			</div>
		);
	}
}

export default GameArea;
