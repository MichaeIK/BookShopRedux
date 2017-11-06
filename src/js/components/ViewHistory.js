import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import initialState from '../constants/initialState';
const mapStateToProps = (state) => {
  return ({User: state.users})
}
@withRouter
@connect(mapStateToProps)
export default class ViewHistory extends React.Component {
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
    renderBooks = (item, index) => {
        let url = {
            backgroundImage: `url(${item.volumeInfo.imageLinks.smallThumbnail})`
        };
        let urlPrice = {
            backgroundImage: 'url(../../assets/img/price.png)'
        }
        let urlCart = {
            backgroundImage: 'url(../../assets/img/icons8-buy.png)'
        }
        return (
            <div key={index} className="col-sm-6 col-md-3 book-wrapper" onClick={this.handleClick.bind(null, item.id)}>
                <div className="col-sm-6 col-md-3 book-wrapper" >
                    <div className="book-image" style={url}></div>
                    <div className="middle-layer"></div>
                    <div className="book-info">
                        <div className="book-title toggle-info">{item.volumeInfo.title}</div>
                        <div className="book-pages toggle-info">Pages: {item.volumeInfo.pageCount}</div>
                        <div className="book-category toggle-info">Category: {item.volumeInfo.categories}</div>
                        <div className="col-sm-2 book-stars toggle-info"></div>
                        <div className="book-card-footer toggle-info">
                            <div className="price-block">
                                <div className="price-image" style={urlPrice}></div>
                                <div className="price-value">500 UAH</div>
                            </div>
                            <div className="cart-block">
                                <div className="price-image" style={urlCart}></div>
                                <div className="price-value">BUY</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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