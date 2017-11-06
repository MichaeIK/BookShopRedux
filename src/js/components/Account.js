import React, { Component } from 'react';
import initialState from '../constants/initialState';
import Cart from './Cart'
import WishList from './WishList'
import OrderHistory from './OrderHistory'
import ViewHistory from './ViewHistory';
import { withRouter } from 'react-router';

@withRouter
export default class Account extends React.Component {
    state = {
        Cart: false,
        WishList: false,
        OrderHistory: false,
		ViewHistory: false,
		// current: this
	}
	
	constructor(props) {
		super(props);
		this.menuDisplay = this.menuDisplay.bind(this);
	}

    menuDisplay(item) {
		// console.log(this, item)
		let menuAcc = item || this.props.match.params.category;
		// console.log("Menu Acc >>> ", menuAcc);
		
        if (menuAcc == 'Cart' && this.state.Cart == false){
			this.setState({Cart: true, WishList: false, OrderHistory: false, ViewHistory: false})
			this.props.history.push(`/account/${menuAcc}`)
        } if (menuAcc == 'Wish list' && this.state.WishList == false){
			this.setState({Cart: false, WishList: true, OrderHistory: false, ViewHistory: false})
			this.props.history.push(`/account/${menuAcc}`)
        } if (menuAcc == 'Order history' && this.state.OrderHistory == false){
			this.setState({Cart: false, WishList: false, OrderHistory: true, ViewHistory: false})
			this.props.history.push(`/account/${menuAcc}`)
        } if (menuAcc == 'View history' && this.state.ViewHistory == false){
			this.setState({Cart: false, WishList: false, OrderHistory: false, ViewHistory: true})
			this.props.history.push(`/account/${menuAcc}`)
        }
	}
	
    componentWillMount() {
        this.menuDisplay();
    }
    componentDidUpdate() {
		console.log('did');
		this.menuDisplay(null);
    }
    render() {
		// console.log("Account render: >>> ", this.state);
        return (
            <div className="row">
                <div className="col-md-2 col-sm-12">
                    <ul>
                        {initialState.userMenu.map((item,i) => 
							<li key={i}
								onClick={this.menuDisplay.bind(null, item)}>
								{item}
							</li>
						)}
                    </ul>
                </div>
                <div className="col-md-10 col-sm-12">
                    {this.state.Cart ? <Cart /> : null}
                    {this.state.WishList ? <WishList /> :null}
                    {this.state.OrderHistory? <OrderHistory /> :null}
                    {this.state.ViewHistory? <ViewHistory /> :null}
                </div>
            </div>
        );
    }
}
