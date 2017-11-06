import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {delFromCart} from '../actions';


const mapStateToProps = (state, ownProps) => {
    console.log(state.users)
    console.log(state.users.authorized)
    return {user: state.users.users.find((item,i)=> (item.name == state.users.authorized))} 
 }

 const mapDispatchToProps = (dispatch)=> {
	return bindActionCreators({delFromCart}, dispatch);
}


 @connect(mapStateToProps, mapDispatchToProps)
export default class Cart extends React.Component {
    

    componentWillMount(){
        this.props.cart;
    }

    componentDidUpdate() {
        this.props.cart;
    }

    handleDel(id_book){
        this.props.delFromCart(id_book)
    }
 
    renderBuys(item,index) {
        const url = {backgroundImage: `url(${item.volumeInfo.imageLinks.smallThumbnail})`};
        const star = {backgroundImage: 'url(../../assets/img/icons8-star-filled.png)'}
        
        return (
            <div className='cart-wrapper row'>    
                <div className='col-md-1 col-sm-12'>{index}</div>
                <div style={url} className='col-md-3 col-sm-12 book-image'></div>
                <div className='col-md-3 col-sm-12'>{item.volumeInfo.title}</div>
                <div className='col-md-2 col-sm-12'>
                    {item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : '400'}
                    {item.saleInfo.listPrice ? item.saleInfo.listPrice.currencyCode :'UAH' }
                </div>
                <div className='col-md-2 col-sm-12'><input type='text' defaultValue='1'/></div>
                <div style={star} className='col-md-1 col-sm-12 book-image' onClick={this.handleDel.bind(this, item.id)}></div>

            </div>
    )}

    render() {
        return (
            <div>
                {this.props.user.cart.map((item, index) => { return this.renderBuys(item, index+1)})}
            </div>
        )
    }
}