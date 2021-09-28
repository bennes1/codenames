import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * PictureAsset
 * This renders an asset from a picture.
 *
 * @TODO: Make it so that asset does not rerender after loading.
 */
class PictureAsset extends React.Component {

  // Once loaded the first time, keep the asset value until unloaded.
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

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
