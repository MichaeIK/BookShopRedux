import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {user: state.users }
 }

 @connect(mapStateToProps)
export default class Cart extends React.Component {


    books = () =>{
        let viewList;
        this.props.user.users.map((item,i)=> {
            if (item.name == this.props.user.authorized){
                viewList = item.viewHistory;    
            }   
        })
        return viewList;
    }

    render() {
        return (
            <div className="wrapper">
              {}
            </div>
        )
    }
}