import React from 'react';
import Card from 'react-bootstrap/Card';

/**
 * WordAsset
 * This renders an asset from a word.
 */
class WordAsset extends React.Component {

  /**
   * shouldComponentUpdate
   * Once loaded the first time, keep the asset value until unloaded.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  /**
   * render
   * Renders the word asset.
   */
	render() {
		return (
			<Card body className="asset">
				{this.props.word}
			</Card>
		);
	}
}

export default WordAsset;
