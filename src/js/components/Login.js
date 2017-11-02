import React, { Component } from 'react';

export default class Login extends React.Component {

	handleOnClickLogin = ()=> {

	}
	render() {
		return (
			<div className="authorizationForm">
                <input type="text" ref="login" placeholder="Login" />
                <input type="password" ref="password" placeholder="Password" />
                <button className="btn-success" onClick={this.handleOnClickLogin}>Login</button>
                <button className="btn-success" onClick={this.handleOnClickLogin}>Sign in</button>
            </div>
		);
	}
}
