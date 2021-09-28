import React from 'react';
import ErrorAlert from './ErrorAlert';

class Loading extends React.Component {
	render() {

		if (this.props.errorMessage) {
			return (
				<ErrorAlert errorMessage={this.props.errorMessage} />
			);
		}

    if (!this.props.dataLoaded) {
      return (
        <h1> Loading </h1>
      );
    }

		return this.props.children;
	}
}

export default Loading;
