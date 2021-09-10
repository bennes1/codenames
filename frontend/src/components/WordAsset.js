import React from 'react';
import Card from 'react-bootstrap/Card';
const URI = require("urijs");

/**
 * WordAsset
 * This renders an asset from a word.
 *
 * @TODO: Make it so that asset does not rerender after loading.
 */
class WordAsset extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			word: 'Loading...'
		}
	}

	/**
	 * componentDidMount
	 * When this component loads, retrieve the asset from the database.
	 */
	componentDidMount() {
      let url = URI("/api/retrieveAsset")
      	.query({assetid: this.props.assetid, type: "W"});

      const requestMetadata = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(url, requestMetadata)
        .then(res => res.json())
        .then(results => {
          let state = this.state;
          if (results.status !== "000") {
          	this.setState({word: "Error..."});
          } else {
          	this.setState({word: results.value});
          }
        }).catch(e => {
          this.setErrorMessage("Could not connect to database.");
          console.log(e);
        });
	}

	render() {
		return (
			<Card body className="asset">
				{this.state.word}
			</Card>
		);
	}
}

export default WordAsset;
