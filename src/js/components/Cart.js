import React from 'react';
import { connect } from 'react-redux';
const mapStateToProps = (state, ownProps) => {
    console.log(state.users)
    console.log(state.users.authorized)
    return {user: state.users.users.find((item,i)=> (item.name == state.users.authorized))} 
 }
 @connect(mapStateToProps)
export default class Cart extends React.Component {
    componentWillMount(){
        this.props.cart;
    }
    componentDidUpdate() {
        this.props.cart;
    }
 
    render() {
    
        return (
            <div>
                cart test!!!!!
                <ul>
                    {this.props.user.cart.map((item,i) => {return <li key={i}><p>{item.volumeInfo.title}</p></li>})}
                </ul>
            </div>
        );
    }
}