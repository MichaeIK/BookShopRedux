import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchBooks, addToHistory } from '../actions';
import { withRouter } from 'react-router';
import Slider from './Slider';
import { ORIGIN, ENV_HREF } from '../config';
const mapStateToProps = (state, ownProps) => {
    return { books: state.data }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks, addToHistory }, dispatch);
}
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {

    fetchData = (keyword) => {
        // console.log(this.props)
        keyword = keyword ? keyword : this.props.match.params.category ? this.props.match.params.category : 'books for developer';
        // console.log(this.props.match.params.category);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=10&startIndex=1&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU`)
            .then(res => res.json())
            .then(res => {
                this.props.fetchBooks(res.items);
            })
            .catch(err => console.log(err))
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.category !== nextProps.match.params.category) {
            this.fetchData(nextProps.match.params.category)
        }
    }
    componentDidMount() {
        this.fetchData();

    }
    handleClick = (id) => {
        // console.log(this.props.history);
        this.props.addToHistory(id);
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
        )
    }
    render() {
        console.log(this.props)
        return (
            <div className="row">



                <div className=""  >
                    {this.props.match.params.category ? <div className='col-md-3 col-sm-12'><Categories /></div>
                        : null}
                    <div className="wrapper-for-books">
                        {this.props.books.map((item, index) =>
                            this.renderBooks(item, index))}
                    </div>
                </div>
            </div>
        )
    }
}