import React from 'react';
import PictureAsset from './PictureAsset';
import WordAsset from './WordAsset';
import Card from 'react-bootstrap/Card';
import { returnColorBackground, returnColorBorder } from '../includes/color';

/**
 * MasterAsset
 * This represents the asset for a codemaster.  The border shows if the asset is
 * the assassin, red team's, blue team's, or neutral.
 * Based on the props for type, either renders a PictureAsset or a WordAsset.
 */
class MasterAsset extends React.Component {

	getBorderClasses() {
		let classes = "assetControl";

		// If the asset is already guessed, the color is obvious.
		if (this.props.cover === "T") {
			classes += " " + returnColorBorder(this.props.color);
		}
		return classes;
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

		const coverClassNames = this.getBackgroundClasses();
		const borderClassNames = this.getBorderClasses();
		return (
			<Card
				className={borderClassNames}
				onClick={this.handleClick}
			>
				{this.props.cover !== "T" ?
					<Card className={coverClassNames}></Card> :
					this.props.type === "P" ?
						<PictureAsset assetid={this.props.assetid} /> :
						<WordAsset assetid={this.props.assetid} />
				}

			</Card>
		);
	}
}

export default MasterAsset;
