import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import Registration from '../components/Registration';

const logo = {
	backgroundImage: 'url(../../assets/img/logo.png)'
}
const cartEmptyCart = {
	backgroundImage: 'url(../../assets/img/shopping_cart_empty.png)'
}
const cartWithGoods = {
	backgroundImage: 'url(../../assets/img/shopping_cart.png)'
}
const user = {
	backgroundImage: 'url(../../assets/img/user.png)'
}
@withRouter
export default class Header extends React.Component {
  state = {
    visibleLogin: false,
    visibleReg: false,
  }

	handleInputChange =(e)=>{
		if(e.key === 'Enter'){
			console.log(this.refs.search.value)
      this.props.history.push(`/search/${this.refs.search.value}`);

      this.refs.search.value = '';
		}
	}

	handleOnClickCart =()=>{
		console.log('Click on cart')
	}

	handleOnClickUser =()=>{
		console.log('Click on user')
      if (this.state.visibleReg == true){
        this.setState({visibleLogin: false})
        console.log('hello')
      } else {
        this.setState({visibleLogin: !this.state.visibleLogin})
      }
      
	}

  handleonClickLogo =()=>{
    this.props.history.push(`/`);
  }
  closeLogin = ()=>{
    this.setState({visibleLogin:false})
  }
  closeReg = ()=>{
    this.setState({visibleReg: !this.state.visibleReg});
  }


    render() {
        return (
            <div className="header">
            	<div className="col-md-2 col-sm-12">
             		<div className="logo" style={logo} onClick={this.handleonClickLogo}></div>
             	</div>
              	<div className="col-md-8 col-sm-12 search">
              		<input type ="text" ref="search" onKeyPress={this.handleInputChange} placeholder="Search..." />
              	</div>
              	<div className="col-md-1 col-sm-12 accoundBlock">
                  <div className="cart" onClick={this.handleOnClickCart} style={cartEmptyCart}>
                  </div>
                </div>
                <div className="col-md-1 col-sm-12 accoundBlock">
                  <div className="account" onClick={this.handleOnClickUser} style={user}></div>
                  {this.state.visibleLogin? <Login closeLogin={this.closeLogin} closeReg={this.closeReg} /> :null}
              		<div className="accountStatus" onClick={this.handleOnClickUser}></div>
                  <p className="pUserName">User name</p>
                  {this.state.visibleReg? <Registration closeReg={this.closeReg} /> :null}
                  <ul className="menuUser">
                    <a><li>User Name</li></a>
                    <a><li>Wish list</li></a>
                    <a><li>Order history</li></a>
                    <a><li>View history</li></a>
                    <a><li>Exit</li></a>
                  </ul>
              	</div>
                
            </div>
        )
    }
}