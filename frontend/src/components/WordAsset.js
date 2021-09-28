import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * WordAsset
 * This renders an asset from a word.
 *
 * @TODO: Make it so that asset does not rerender after loading.
 */
class WordAsset extends React.Component {

  // Once loaded the first time, keep the asset value until unloaded.
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

	render() {
		return (
			<Card body className="asset">
				{this.props.word}
			</Card>
		);
	}
}

export default WordAsset;
