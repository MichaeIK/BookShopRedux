import React from 'react';



export default class Checkout extends React.Component {
    
    render() {
        const clap = {backgroundImage: `url(../../assets/img/clap.png)`};

        return (
        
            <div className='checkout-wrapper'>
                <div style={clap} className="image"></div>
                <h1>Your order is accepted.<br/>
                Additional information will be sent to your email.</h1><br/>
                
                <button onClick={() => (this.props.history.push(`/`))}>Book Store</button>                
                
            </div>
                
        )
    }
}