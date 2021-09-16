import React from 'react';
import PictureAsset from './PictureAsset';
import WordAsset from './WordAsset';
import Card from 'react-bootstrap/Card';

/**
 * PlayerAsset
 * This represents the asset for the player/guesser.  Unlike the codemaster
 * mode, the player cannot tell what color the asset is.  They can click on the
 * asset to guess.
 *
 * @TODO: Click event has no effect if it is not their turn.  (Perhaps, popup
 * message in this case.)
 * @TODO: Need to take out colors here.  They will be in use for MasterAsset,
 * PlayerAsset, and future turn components based on the role.
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
      let url = "/api/tryGuess";
      let params = {
      	gameid: this.props.gameid,
      	team: this.props.team,
      	position: this.props.index
      };

      const requestMetadata = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      };

      fetch(url, requestMetadata)
        .then(res => res.json())
        .then(results => {
          if (results.status !== "000") {
          	console.error(results.error.toString());
          }
        }).catch(e => {
          console.error("Could not connect to database.");
          console.error(e);
        });
  	}

  /**
   * getBackgroundClasses
   * translates the cover prop into the actual class used to cover the asset.
   */
	getBackgroundClasses() {
		let classes = "assetCover ";

		switch(this.props.cover) {
			case "R":
				classes += "redBackground";
				break;
			case "B":
				classes += "blueBackground";
				break;
			case "W":
				classes += "neutralBackground";
				break;
			case "A":
				classes += "assassinBackground";
				break;
			case "T":
			default:
				classes = "";
				break;
		}
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
						<PictureAsset assetid={this.props.assetid} /> :
						<WordAsset assetid={this.props.assetid} />
				}

			</Card>
		);
	}
}

export default PlayerAsset;
