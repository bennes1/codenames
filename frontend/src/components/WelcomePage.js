import React from 'react';
import CreateGameForm from './CreateGameForm';

/**
 * WelcomePage
 * Serves as an entrypoint into the application.
 *
 * @TODO: Add form to go to in-progress game.
 */
class WelcomePage extends React.Component {

  /**
   * render
   * Renders the WelcomePage.
   */
	render() {
		return (
			<div className="welcomePage">
				<CreateGameForm />
			</div>
		)
	}
}

export default WelcomePage;
