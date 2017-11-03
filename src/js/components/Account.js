import React, { Component } from 'react';
import initialState from '../constants/initialState';
import WishList from './WishList'
import OrderHistory from './OrderHistory'
import ViewHistory from './ViewHistory'


export default class Account extends React.Component {
 	state = {
    	WishList: false,
    	OrderHistory: false,
    	ViewHistory: false,
  	}
	menuDisplay = () => {
 		let menuAcc = this.props.match.params.category;
 		if (menuAcc == 'Wish list' && this.state.WishList == false){
			this.setState({WishList: true, OrderHistory: false, ViewHistory: false})
		} if (menuAcc == 'Order history' && this.state.OrderHistory == false){
			this.setState({WishList: false, OrderHistory: true, ViewHistory: false})
		} if (menuAcc == 'View history' && this.state.ViewHistory == false){
			this.setState({WishList: false, OrderHistory: false, ViewHistory: true})
		}

	}

	componentDidUpdate() {
		this.menuDisplay();
	}


	render() {
		return (

			<div className="row">
				<div className="col-md-2 col-sm-12">
					<ul>
						{initialState.userMenu.map((item,i) => {return  <li key={i} onClick={() => this.props.history.push(`/Account/${item}`)}>{item}</li>})}
					</ul>
				</div>
				<div className="col-md-2 col-sm-12">
					{this.state.WishList? <WishList /> :null}
					{this.state.OrderHistory? <OrderHistory /> :null}
					{this.state.ViewHistory? <ViewHistory /> :null}
				</div>
			</div>

		);
	}
}
