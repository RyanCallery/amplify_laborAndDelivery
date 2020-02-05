import React, { Component } from 'react';
import AppContainer from './screens/AppContainer';
import AddProviderScreen from './screens/AddProviderScreen';

import { Auth, Hub } from 'aws-amplify';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Authenticator, AmplifyTheme, SignUp, ConfirmSignUp } from 'aws-amplify-react';
import './App.css';

class App extends Component {
	state = {
		user: null
	};

	componentDidMount = () => {
		// console.dir(AmplifyTheme);
		this.getUserData();
		Hub.listen('auth', this, 'onHubCapsule');
	};

	onHubCapsule = (capsule) => {
		switch (capsule.payload.event) {
			case 'signIn':
				this.getUserData();
				break;
			case 'signUp':
				console.log('sign up');
				break;
			case 'signOut':
				console.log('sign out');
				this.setState({ user: null });
				break;
			default:
				return;
		}
	};

	getUserData = async () => {
		const user = await Auth.currentAuthenticatedUser();
		user ? this.setState({ user }) : this.setState({ user: null });
	};

	signInMessage = async (userName, password) => {
		// try {
		// 	const result = await auth.signInWithEmailAndPassword(userName, password);
		// 	console.log(result);
		// 	this.setState({ isLoggedIn: true });
		// } catch (err) {
		// 	alert('incorrect username or password');
		// 	console.log('i hate onions', err);
		// }
	};

	render() {
		const { user } = this.state;

		return !user ? (
			<Authenticator className="authenticator" theme={theme} hide={[ SignUp, ConfirmSignUp ]} />
		) : (
			<Router>
				<React.Fragment>
					<Route exact path="/" component={AppContainer} />
					<Route exact path="/addProvider" component={AddProviderScreen} />
				</React.Fragment>
			</Router>
		);

		// return !user ? <Loginscreen handleSubmit={this.signInMessage} /> : <AppContainer logOut={this.logOut} />;
	}
}

const theme = {
	...AmplifyTheme
};

export default App;

// export default withAuthenticator(App, true, [], null, theme);
