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
 * @TODO: Add logic to guess
 * @TODO: Click event has no effect if it is not their turn.  (Perhaps, popup
 * message in this case.)
 * @TODO: Need to take out colors here.  They will be in use for MasterAsset,
 * PlayerAsset, and future turn components based on the role.
 */
class PlayerAsset extends React.Component {
	constructor(props) {
		super(props);
	}

	getStyle() {
		const red = "red";
		const blue = "blue";
		const black = "black";
		const white = "grey";

		let style = {};

		switch(this.props.cover) {
			case "R":
				style.backgroundColor = red;
				break;
			case "B":
				style.backgroundColor = blue;
				break;
			case "W":
				style.backgroundColor = white;
				break;
			case "A":
				style.backgroundColor = black;
				break;
			case "T":
			default:
		}
		return style;
	}

	render() {

		const style = this.getStyle();
		return (
			<Card className="assetControl" style={style}>
				{this.props.type === "P" ?
					<PictureAsset assetid={this.props.assetid} /> :
					<WordAsset assetid={this.props.assetid} />
				}
			</Card>
		);
	}
}

export default PlayerAsset;
