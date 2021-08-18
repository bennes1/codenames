import React from 'react';
import ReactDOM from 'react-dom';
import CreateGameForm from '../components/CreateGameForm';

class CreateGamePage extends React.Component {
	render() {
		return (
			<div className="createGamePage">
				<CreateGameForm />
			</div>
		)
	}
}

export default CreateGamePage;
