import React from 'react';

const logo = {
	backgroundImage: 'url(./assets/img/logo.png)'
}
const cartEmptyCart = {
	backgroundImage: 'url(./assets/img/shopping_cart_empty.png)'
}
const cartWithGoods = {
	backgroundImage: 'url(./assets/img/shopping_cart.png)'
}
const user = {
	backgroundImage: 'url(./assets/img/user.png)'
}

export default class Header extends React.Component {

	handleInputChange =(e)=>{
		if(e.key === 'Enter'){
			console.log(this.refs.search.value)
		}
	}

	handleOnClickCart =()=>{
		console.log('Click on cart')
	}

	handleOnClickUser =()=>{
		console.log('Click on user')
	}

    render() {
        return (
            <div className="header">
            	<div className="col-md-2">
             		<a href="#"><div className="logo" style={logo}></div></a>
             	</div>
              	<div className="col-md-8 search">
              		<input size="30" type ="text" ref="search" onKeyPress={this.handleInputChange} placeholder="Search..." />
              	</div>
              	<div className="col-md-2 accoundBlock">
              		<div className="cart" onClick={this.handleOnClickCart} style={cartEmptyCart}>
              		</div>
              		<div className="account" onClick={this.handleOnClickUser} style={user}></div>
              		<div className="accountStatus" onClick={this.handleOnClickUser} ><p>User name</p></div>
              	</div>

            </div>
        )
    }
}