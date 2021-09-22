import React from 'react';
import Card from 'react-bootstrap/Card';
import Api from './Api';

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
		Api.get("retrieveAsset", {
				assetid: this.props.assetid,
				type: "W"
			},
			(data) => {
				this.setState({word: data});
			},
			(error) => {
				this.setState({word: "Error..."});
			}
		);
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
