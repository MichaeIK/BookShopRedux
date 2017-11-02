import React, { Component } from 'react';

export default class Login extends React.Component {
	render() {
		return (
			<div className="authorizationForm">
                <input type="text" ref="login" placeholder="Login" />
                <input type="password" ref="password" placeholder="Password" />
                <button className="btn-success" onClick={this.handleonClickLogin}>Login</button>
                <button className="btn-success" onClick={this.handleonClickLogin}>Sign in</button>
            </div>
		);
	}
}
