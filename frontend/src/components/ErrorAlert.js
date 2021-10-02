import React from 'react';
import Alert from 'react-bootstrap/Alert';

/**
 * ErrorAlert
 * Simple error display message.  This is totally controlled by the parent.
 */
class ErrorAlert extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.errorMessage !== this.props.errorMessage;
  }

  /**
   * renderErrorMessage
   * Displays the error as a string if it is a string.  If it is an array, then
   * display as an unordered list.  React does not accept objects.
   *
   * @param errorMessage -- the error message to display.
   */
  renderErrorMessage(errorMessage) {
    if (typeof errorMessage === "string") {
      return errorMessage;
    } else if (errorMessage.length === 1) {
      return errorMessage[0];
    } else {
      return (
        <>
          {"Errors found:"}<br />
          <ul>
            {errorMessage.map((elem, index) => {
              return (
                <li key={index}>
                  {elem}
                </li>
              );
            })}
          </ul>
        </>
      );
    }
  }

  /**
   * render
   * Renders the error alert.
   */
  render() {
  	if (this.props.errorMessage && this.props.errorMessage.length > 0) {
	    return (
	      <Alert variant="danger">
	        {this.renderErrorMessage(this.props.errorMessage)}
	      </Alert>
	    );
  	}
  	return null;
  }
}

export default ErrorAlert;
