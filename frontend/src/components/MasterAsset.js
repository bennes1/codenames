import React from 'react';
import PictureAsset from './PictureAsset';
import WordAsset from './WordAsset';
import Card from 'react-bootstrap/Card';

/**
 * MasterAsset
 * This represents the asset for a codemaster.  The border shows if the asset is
 * the assassin, red team's, blue team's, or neutral.
 * Based on the props for type, either renders a PictureAsset or a WordAsset.
 *
 * @TODO: Need to take out colors here.  They will be in use for MasterAsset,
 * PlayerAsset, and future turn components based on the role.
 */
class MasterAsset extends React.Component {
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

		let changeBorder = true;
		switch(this.props.color) {
			case "R":
				style.borderColor = red;
				break;
			case "B":
				style.borderColor = blue;
				break;
			case "W":
				style.borderColor = white;
				break;
			case "A":
				style.borderColor = black;
				break;
			default:
				changeBorder = false;
		}
		if (changeBorder) {
			style.borderWidth = 3;
			style.borderTopWidth = 5;
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

export default MasterAsset;
