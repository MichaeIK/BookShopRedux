import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import initialState from '../constants/initialState';

const mapStateToProps = (state) => {
  return ({User: state.users})
}


@withRouter
@connect(mapStateToProps)
export default class WishList extends React.Component {

	wishListArr = () =>{
		let wishList;
		this.props.User.users.map((item,i)=> {
			if (item.name == this.props.User.authorized){
				wishList = item.wishList;	
			}	
		})
		return wishList;
	}


	componentDidUpdate() {
		this.wishListArr();
	}

	render() {
		let list = this.wishListArr()
		console.log('hey', list)
		return (
			<div>
				<ul>
			 		{list.map((item,i) => {return <li key={i}><p>{item.volumeInfo.title}</p></li>})}
			 	</ul>
			</div>
		);
	}
}
