import React from 'react';

/**
 * ErrorBoundary
 * Displays a message when one of the subcomponents does not load correctly.
 */
class ErrorBoundary extends React.Component {

  /**
   * constructor
   * Sets the initial state of hasError to false.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * getDerivedStateFromError
   * Update state so the next render will show the fallback UI.
   */
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  /**
   * render
   * Renders the ErrorBoundary.
   */
  render() {
    // You can render any custom fallback UI
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
