import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import Registration from '../components/Registration';
import initialState from '../constants/initialState';

import { fetchBooks, changeActiveCategory } from '../actions';


import { bindActionCreators } from 'redux';
import { fetchData } from '../functions/fetchData';



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchBooks, changeActiveCategory }, dispatch);
}

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

const mapStateToProps = (state) => {

  return ({User: state.users.authorized, 
          users: state.users})

}


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.fetchData = fetchData.bind(this);
  }

  state = {
    visibleLogin: false,
    visibleReg: false,
  }

  handleInputChange = (e) => {
    if (e.key === 'Enter') {
      console.log(this.refs.search.value);
      this.props.changeActiveCategory(this.refs.search.value);
      this.forceUpdate();
      this.fetchData(this.refs.search.value);
      this.props.history.push(`/search/${this.refs.search.value}`);
      
      this.refs.search.value = '';
    }
  }

	handleOnClickCart =()=>{
		console.log('Click on cart')
    // console.log(this.props.User);
    this.props.history.push(`/account/Cart`);
    console.log(initialState.users.map((item)=> item.cart))
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


  handleonClickLogo = () => {
    this.fetchData('books for developers');
    this.props.history.push(`/`);
    // this.forceUpdate();

  }
  closeLogin = () => {
    this.setState({ visibleLogin: false })
  }
  closeReg = () => {
    this.setState({ visibleReg: !this.state.visibleReg });
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
                  <p className="pUserName">{this.props.User}</p>
                  {this.state.visibleReg? <Registration closeReg={this.closeReg} /> :null}
                  <ul className="menuUser">

                  {initialState.userMenu.map((item,i) => {return  <li key={i} onClick={() => this.props.history.push(`/account/${item}`)}>{item}</li>})}
                  </ul>
              	</div>
            </div>
        )
    }

}