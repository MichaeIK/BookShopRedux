import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import Registration from '../components/Registration';
import initialState from '../constants/initialState';

import { fetchBooks, changeActiveCategory, clearSearch } from '../actions';

import { bindActionCreators } from 'redux';
import fetchData from '../functions/fetchData';

import PropTypes from 'prop-types';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchBooks, changeActiveCategory, clearSearch }, dispatch);
}

const logo = {
  backgroundImage: 'url(../../assets/img/logo.png)'
}


let cartEmptyCart = {
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
          users: state.users.users,
          user: state.users.users.filter((item) => item.name === state.users.authorized)[0] })

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
      this.props.clearSearch();
      this.context.changeCategory("search", this.refs.search.value, true);
      this.refs.search.value = '';
    }
  }

  static contextTypes = {
      changeCategory: PropTypes.func.isRequired
  }

	handleOnClickCart =()=>{
    this.props.history.push(`/account/Cart`);
	}

  componentWillReceiveProps(nextProps) {
    nextProps.users.map((item) => {
      if(item.name === nextProps.User){
        if (item.cart.length > 0){
          cartEmptyCart = {
            backgroundImage: 'url(../../assets/img/shopping_cart.png)' 
          }
        } else {
            cartEmptyCart = {
                backgroundImage: 'url(../../assets/img/shopping_cart_empty.png)'
            }
          }
        }
      }
    )
  }

	handleOnClickUser =()=>{
    if (this.props.User == 'Please login') {
      if (this.state.visibleReg == true){
        this.setState({visibleLogin: false})
        // this.refs.userMenuHover   ---------Michael block menu for Please login
      } else {
        this.setState({visibleLogin: !this.state.visibleLogin})
      }
    }
      
	}


  handleonClickLogo = () => {
    // this.fetchData('books for developers');
    this.props.changeActiveCategory('React');
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
                  <h2>Dream Team Book Store</h2>
              		<input type ="text" ref="search" onKeyPress={this.handleInputChange} placeholder="Search..." />
              	</div>
              	<div className="col-md-1 col-sm-12 accoundBlock">
                  <div className="cart" onClick={this.handleOnClickCart} style={cartEmptyCart}>
                  
                  </div>
                </div>
                <div className="col-md-1 col-sm-12 accoundBlock">
                  <div className="account" onClick={this.handleOnClickUser} style={user}></div>
                  {this.state.visibleLogin? <Login closeLogin={this.closeLogin} closeReg={this.closeReg} /> :null}
              		<div className="accountStatus"></div>
                  <p className="pUserName" onClick={this.handleOnClickUser}>{this.props.User}</p>
                  <div ref="userMenuHover"id="user-hover"></div>
                  {this.state.visibleReg? <Registration closeReg={this.closeReg} /> :null}
                  <ul className="menuUser">
                  {initialState.userMenu.map((item,i) =>  
                    <li key={i} 
                     onClick={() => this.props.history.push(`/account/${item}`)}>
                      {item}
                    </li>
                  )}
                  </ul>
              	</div>
            </div>
        )
    }

}