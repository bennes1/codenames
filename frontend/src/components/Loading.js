import React from 'react';
import ErrorAlert from './ErrorAlert';

/**
 * Loading
 * Simple component to show loading, error, or children if loaded and no errors.
 */
class Loading extends React.Component {

  /**
   * render
   * Render loading.  If there are error messages, display them.  If data isn't
   * loaded, then show loading.  Otherwise, show children of component.
   */
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
