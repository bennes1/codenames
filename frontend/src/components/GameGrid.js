import React from 'react';
import MasterAsset from './MasterAsset';
import PlayerAsset from './PlayerAsset';
import {Container, Row, Col} from 'react-bootstrap';

/**
 * GameGrid
 * Constructs the grid based on the assets used in the game.
 * It contains fetchers for loading the grid and pulling guesses in the game.
 */
class GameGrid extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.grid !== this.props.grid;
  }

  renderElement(element, index) {
    if (["RM", "BM"].indexOf(this.props.role) !== -1) {
      return (
        <Col key={index}>
          <MasterAsset
            cover={element.cover}
            color={element.color}
            type={element.type}
            asset={element.asset}
            index={index}
          />
        </Col>
      )
    } else {
      return (
        <Col key={index}>
          <PlayerAsset
            cover={element.cover}
            type={element.type}
            asset={element.asset}
            role={this.props.role}
            index={index}
            gameid={this.props.gameid}
          />
        </Col>
      )
    }
  }

  renderRow(startIndex, endIndex) {
    let elements = [];
    for (let i = startIndex; i !== endIndex; i++) {
      elements.push(this.renderElement(this.props.grid[i], i));
    }
    return (
      <Row key={startIndex}>
        {elements}
      </Row>
    );
  }

  /**
   * render
   * Renders the grid.  If the user is a codemaster, then use MasterAssets,
   * otherwise use PlayerAssets.
   */
	render() {

    const length = parseInt(this.props.grid.length);
    const rowSize = parseInt(this.props.rowSize);
    let rows = [];
    for(let i = 0; i < length; i += rowSize) {
      rows.push(this.renderRow(i, i + rowSize));
    }

		return (
			<div className="gamegrid">
				<Container>
					{rows}
				</Container>
			</div>
		)
	}
}

export default GameGrid;
