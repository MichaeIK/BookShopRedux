import React, { Component } from 'react';
import { checkUsers } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapDispatchToProps = (dispatch)=> {
	return bindActionCreators({checkUsers}, dispatch);
}

@connect(null, mapDispatchToProps)
export default class Login extends React.Component {

	handleOnClickLogin = ()=> {
		let user = {
			name: this.refs.login.value,
			password: this.refs.password.value
		}
		this.refs.login.value = '';
		this.refs.password.value = '';
		this.props.checkUsers(user);
		this.props.closeLogin();
	}

	handleOnClickSingin = ()=> {
		console.log('Aaaaaaaaaa');
		this.props.closeLogin();
		this.props.closeReg();

	}
	render() {
		
		return (
			<div className="authorizationForm">
                <input type="text" ref="login" placeholder="Login" />
                <input type="password" ref="password" placeholder="Password" />
                <button className="btn-success" onClick={this.handleOnClickLogin}>Login</button>
                <button className="btn-success" onClick={this.handleOnClickSingin}>Sign in</button>
            </div>
		);
	}
}