import React from 'react';



export default class Checkout extends React.Component {
    
    render() {

        return (
            <div>
                <h1>Your order is accepted.<br/>
                Additional information will be sent to your email</h1>
                <h2>Have a nice day!))</h2>
                <buttom onClick={() => (this.props.history.push(`/`))}>Book Store</buttom>
                <buttom onClick={() => (this.props.history.push(`/account/Cart`))}>Back to cart</buttom>
            </div>
            
        )
    }
}