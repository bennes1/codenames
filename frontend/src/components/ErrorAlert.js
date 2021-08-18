import React from 'react';
import Alert from 'react-bootstrap/Alert';

/**
 * ErrorAlert
 * Simple error display message.  This is totally controlled by the parent.
 */
class ErrorAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.errorMessage != this.props.errorMessage;
  }

  render() {
  	if (this.props.errorMessage) {
	    return (
	      <Alert variant="danger">
	        {this.props.errorMessage}
	      </Alert>
	    );
  	}
  	return null;
  }
}

export default ErrorAlert;
