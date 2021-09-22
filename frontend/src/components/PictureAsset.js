import React from 'react';
import Card from 'react-bootstrap/Card';
import Api from './Api';

/**
 * PictureAsset
 * This renders an asset from a picture.
 *
 * @TODO: Make it so that asset does not rerender after loading.
 */
class PictureAsset extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			word: 'loading...',
			picture: null
		}
	}

	/**
	 * componentDidMount
	 * When this component loads, retrieve the asset from the database.  This will
	 * show up as base64 encoding.
	 */
	componentDidMount() {
		Api.get("retrieveAsset", {
				assetid: this.props.assetid,
				type: "P"
			},
			(data) => {
				this.setState({picture: data, word: null});
			},
			(error) => {
				this.setState({word: "Error..."});
			}
		);
	}

	render() {
		const src = "data:image/jpeg;base64," + this.state.picture;
		return (
			<Card className="asset">
				<Card.Img src={src} />
				{this.state.word && <Card.Body>{this.state.word}</Card.Body>}
			</Card>
		);
	}
}

export default PictureAsset;
