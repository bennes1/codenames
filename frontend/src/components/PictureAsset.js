import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * PictureAsset
 * This renders an asset from a picture.
 */
class PictureAsset extends React.Component {

  /**
   * shouldComponentUpdate
   * Once loaded the first time, keep the asset value until unloaded.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  /**
   * render
   * Shows the picture in the card using the base64 encoding in the database.
   */
	render() {
		const src = "data:image/jpeg;base64," + this.props.pictureData;
		return (
			<Card className="asset">
				<Card.Img src={src} />
			</Card>
		);
	}
}

export default PictureAsset;
