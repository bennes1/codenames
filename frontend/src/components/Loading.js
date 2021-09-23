import React from 'react';
import ErrorAlert from './ErrorAlert';

class Loading extends React.Component {
	render() {
		if (!this.props.dataLoaded) {
			return (
				<h1> Loading </h1>
			);
		}

		if (this.props.errorMessage) {
			return (
				<ErrorAlert errorMessage={this.props.errorMessage} />
			);
		}

		return this.props.children;
	}
}

export default Loading;
