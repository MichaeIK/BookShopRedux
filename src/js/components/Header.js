import React from 'react';

export default class Header extends React.Component {

    render() {
        return (
            <div className="header">
              <a href="#"><div className="logo">logo here</div></a>
              <input ref="Search" placeholder="Search..." />
              <div className="cart">Cart is here</div>
              <div className="account">Accaunt is here</div>
              <div className="accountStatus">Accaunt status is here</div>

            </div>
        )
    }
}