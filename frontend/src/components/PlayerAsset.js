import React from 'react';
import PictureAsset from './PictureAsset';
import WordAsset from './WordAsset';
import Card from 'react-bootstrap/Card';
import api from '../includes/api';
import { returnColorBackground } from '../includes/color';

/**
 * PlayerAsset
 * This represents the asset for the player/guesser.  Unlike the codemaster
 * mode, the player cannot tell what color the asset is.  They can click on the
 * asset to guess.
 *
 * @TODO: Click event has no effect if it is not their turn.  (Perhaps, popup
 * message in this case.)
 */
class PlayerAsset extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	/**
	 * handleClick
	 * On click, see if the guess works for the game.
	 */
	handleClick(event) {
		api.post("tryGuess", {
      			gameid: this.props.gameid,
      			team: this.props.team,
      			position: this.props.index
			}
		);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.cover !== this.props.cover;
  }

  /**
   * getBackgroundClasses
   * translates the cover prop into the actual class used to cover the asset.
   */
	getBackgroundClasses() {
		let classes = "assetCover " + returnColorBackground(this.props.cover);
		return classes;
	}

	render() {

		const classNames = this.getBackgroundClasses();
		return (
			<Card
				className="assetControl"
				onClick={this.handleClick}
			>
				{this.props.cover !== "T" ?
					<Card className={classNames}></Card> :
					this.props.type === "P" ?
						<PictureAsset pictureData={this.props.asset} /> :
						<WordAsset word={this.props.asset} />
				}

			</Card>
		);
	}
}

export default PlayerAsset;
