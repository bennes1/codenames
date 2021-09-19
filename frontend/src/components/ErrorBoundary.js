import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  logErrorToMyService(error, errorInfo) {
    return null;
  }

  // You can also log the error to an error reporting service
  componentDidCatch(error, errorInfo) {
    this.logErrorToMyService(error, errorInfo);
  }

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
