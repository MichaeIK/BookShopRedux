import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {delFromCart, changeQuantity, addToOrderHistory} from '../actions';
import Checkout from './Checkout'
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state, ownProps) => {
    console.log(state.users)
    console.log(state.users.authorized)
    return {user: state.users.users.find((item,i)=> (item.name == state.users.authorized))} 
 }

 const mapDispatchToProps = (dispatch)=> {
	return bindActionCreators({delFromCart, changeQuantity, addToOrderHistory}, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Cart extends React.Component {
    
    

    componentWillMount(){
        this.props.cart;
    }

    componentDidUpdate() {
        this.props.cart;
    }

    componentDidMount(){
        this.sum()
    }

    handleDel(id_book){
        this.props.delFromCart(id_book)
    }
    handleCheckout = () => {
        this.props.history.push(`/account/checkout`)
        let summ = this.sum()
        this.props.addToOrderHistory({books: this.props.user.cart, sum: summ})
        // console.log(new Date(year, month, date, hours, minutes))
    }
    sum() {
        let sum = 0
        console.log('this is suuuum', this.props.user.cart)
        this.props.user.cart.map((item, index) => { 
            console.log(item.book )
            let before_sum = (item.book.saleInfo.listPrice ? Math.round(item.book.saleInfo.listPrice.amount):0)*item.quantity
            sum += before_sum        
            console.log('sum', sum)
            
        })
        return (Math.round(sum))
        sum=0
    }
    // home() { console.log(this); this.props.history.push(`/`);}
    renderBuys(item,index) {
        const url = {backgroundImage: `url(${item.book.volumeInfo.imageLinks.smallThumbnail})`};
        const star = {backgroundImage: 'url(../../assets/img/if_icon-ios7-trash-outline_211835.png)'};
        
        
        return (
            <div className='cart-wrapper row' key={index}>    
                <div className='col-md-1 col-sm-12'>{index}</div>
                <div style={url} className='col-md-3 col-sm-12 book-image'></div>
                <div className='col-md-3 col-sm-12'>{item.book.volumeInfo.title}</div>
                <div className='col-md-2 col-sm-12'>
                    {(item.book.saleInfo.listPrice ? Math.round(item.book.saleInfo.listPrice.amount):0)*item.quantity}
                    {item.book.saleInfo.listPrice ? item.book.saleInfo.listPrice.currencyCode :'UAH' }
                </div>
                <div className='col-md-2 col-sm-12'>
                    <botton onClick={this.props.changeQuantity.bind(null, '+', item)} >+</botton>
                        { item.quantity}
                    <botton onClick={this.props.changeQuantity.bind(null, '-', item)}>-</botton>
                </div>
                <div style={star} className='col-md-1 col-sm-12 book-image' onClick={this.handleDel.bind(this, item.book.id)}></div>
                
            </div>
    )}

    render() {
        return (
            <div>
                <div >{this.props.user.cart.map((item, index) => { return this.renderBuys(item, index+1)})}</div>
                <div className='col-md-1 col-sm-12'>{}<button onClick={() => this.props.history.push(`/`)}>Back to store</button></div>
                <div className='col-md-9 col-sm-12'></div>
                {this.props.user.cart.length !=0 ? (<div>
                                                        {/* <div className='col-md-1 col-sm-12'>{this.sum()} {this.props.user.cart[0].book.saleInfo.listPrice.currencyCode}</div> */}
                                                        <div className='col-md-1 col-sm-12'><button onClick={this.handleCheckout}>Checkout</button></div>
                                                    </div>): false}
                
                

            </div>
            
        )
    }
}