import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {delFromCart, changeQuantity} from '../actions';


const mapStateToProps = (state, ownProps) => {
    console.log(state.users)
    console.log(state.users.authorized)
    return {user: state.users.users.find((item,i)=> (item.name == state.users.authorized))} 
 }

 const mapDispatchToProps = (dispatch)=> {
	return bindActionCreators({delFromCart, changeQuantity}, dispatch);
}


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
    
    sum() {
        let sum = 0
        console.log('this is suuuum', this.props.user.cart)
        this.props.user.cart.map((item, index) => { 
            console.log(item.book )
            let before_sum = (item.book.saleInfo.listPrice ? item.book.saleInfo.listPrice.amount:400)*item.quantity
            sum += before_sum        
            console.log('sum', sum)
            
        })
        return sum
        sum=0
    }
 
    renderBuys(item,index) {
        const url = {backgroundImage: `url(${item.book.volumeInfo.imageLinks.smallThumbnail})`};
        const star = {backgroundImage: 'url(../../assets/img/icons8-star-filled.png)'};
        
        console.log(this.props)
        return (
            <div className='cart-wrapper row'>    
                <div className='col-md-1 col-sm-12'>{index}</div>
                <div style={url} className='col-md-3 col-sm-12 book-image'></div>
                <div className='col-md-3 col-sm-12'>{item.book.volumeInfo.title}</div>
                <div className='col-md-2 col-sm-12'>
                    {(item.book.saleInfo.listPrice ? item.book.saleInfo.listPrice.amount:400)*item.quantity}
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
        // let a = this.sum()
        console.log('df', )
        return (
            <div>
                {this.props.user.cart.map((item, index) => { return this.renderBuys(item, index+1)})}
                <div className='col-md-11 col-sm-12'></div>
                {/* <div className='col-md-1 col-sm-12'>{setTimeout(() => (this.sum), 3000)}</div> */}
                <p>{this.sum()}</p>

            </div>
            
        )
    }
}