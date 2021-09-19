import React from 'react';
import Card from 'react-bootstrap/Card';
const URI = require("urijs");

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
      let url = URI("/api/retrieveAsset")
      	.query({assetid: this.props.assetid, type: "P"});

      const requestMetadata = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(url, requestMetadata)
        .then(res => res.json())
        .then(results => {
          if (results.status !== "000") {
          	this.setState({word: "Error..."});
          } else {
          	this.setState({picture: results.data, word: null});
          }
        }).catch(e => {
          this.setErrorMessage("Could not connect to database.");
          console.log(e);
        });
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
