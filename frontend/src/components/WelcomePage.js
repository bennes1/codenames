import React from 'react';
import CreateGameForm from './CreateGameForm';

class WelcomePage extends React.Component {
	render() {
		return (
			<div className="welcomePage">
				<CreateGameForm />
			</div>
		)
	}
}

export default WelcomePage;
