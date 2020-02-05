import React, { Component } from 'react';
import '../App.css';

class LoginScreen extends Component {
	state = {
		userName: '',
		password: ''
	};

	updateUserName = (e) => {
		this.setState({ userName: e.target.value });
	};

	updatePassword = (e) => {
		this.setState({ password: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { userName, password } = this.state;

		this.props.handleSubmit(userName, password);
	};

	render() {
		return (
			<div className="loginScreen show">
				<div>
					<div className="loginBox">
						<h1>Login</h1>

						<p>UserName</p>
						<input
							type="text"
							name=""
							value={this.state.userName}
							placeholder="Enter Username"
							onChange={this.updateUserName}
						/>
						<p>Password</p>
						<input
							type="password"
							name=""
							value={this.state.password}
							placeholder="Enter Password"
							onChange={this.updatePassword}
						/>
						<button onClick={(e) => this.handleSubmit(e)}>Login</button>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginScreen;
