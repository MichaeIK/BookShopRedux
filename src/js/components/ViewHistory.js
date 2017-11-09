import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import initialState from '../constants/initialState';
import { renderBooks } from '../functions/renderBooks';
import { addToCart } from '../actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return ({User: state.users})
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addToCart }, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class WishList extends React.Component {

    constructor(props) {
        super(props)
        this.renderBooks = renderBooks.bind(this);
    }

    viewHistoryArr = () =>{
        let viewList;
        this.props.User.users.map((item,i)=> {
            if (item.name == this.props.User.authorized){
                viewList = item.viewHistory;    
            }   
        })
        return viewList;
    }
    componentDidUpdate() {
        this.viewHistoryArr();
    }
    handleClick = (id) => {
        this.props.history.push(`/book/${id}`);
    }
        handleBuy = (item) => {
        this.context.notify();
        this.context.val_fun(`You add "${item.volumeInfo.title}" to the cart`)
        this.props.addToCart(item);
    }
    render() {
        let list = this.viewHistoryArr()
        return (
                <div className="row">
                    <div className="wrapper-for-books">
                        {list.map((item, index) =>
                            this.renderBooks(item, index))}
                    </div>
                </div>
        );
    }
}