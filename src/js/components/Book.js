import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchBooks, addToHistory, changeActiveCategory } from '../actions';
import { withRouter } from 'react-router';
import Slider from './Slider';
import { ORIGIN, ENV_HREF } from '../config';
import {fetchData} from '../functions/fetchData';

const mapStateToProps = (state, ownProps) => {
    return {
        category: state.activeCategory.active,
        books: state.data.filter((item) => { return Object.keys(item)[0] == state.activeCategory.active })
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks, addToHistory, changeActiveCategory }, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {

    // fetchData = (keyword) => {
    //     console.log(this.props)
    //     keyword = keyword ? keyword : this.props.match.params.category ? this.props.match.params.category : 'books for developer';
    //     console.log('keyword from fetch data', keyword);
    //     fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&startIndex=1&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU&country=UA`)
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log('res.items from fetchbooks', res.items)
    //             this.props.fetchBooks(res.items, keyword);
    //             this.props.changeActiveCategory(keyword);
    //         })
    //         .catch(err => console.log(err))
    // }

   
    componentWillReceiveProps(nextProps) {
        console.log("NP: ", nextProps, "TP", this.props)

        if (this.props.match.params.category !== nextProps.match.params.category) {
            console.log('!!!!!!!!')
            this.fetchData(nextProps.match.params.category)
        }
    }

    componentWillUpdate() {
        console.log("UPDATE?")

    }

    componentWillMount() {
        console.log('this.props.match.params.category from didMount', this.props.match.params.category)
        this.fetchData();

    }
    handleClick = (id, item) => {
        console.log('click')
        this.props.addToHistory(item);
        this.props.history.push(`/book/${id}`);
        this.forceUpdate();
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
            <div key={index} className="col-sm-6 col-md-3 book-wrapper" onClick={this.handleClick.bind(null, item.id, item)}>
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
    constructor(props) {
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.fetchData = fetchData.bind(this);
    }
    handleChangeCategory(cat) {
        this.forceUpdate();
        console.log('Change category?', cat, this.props);
        this.props.changeActiveCategory(cat);
        this.props.history.push(`/category/${cat}`);
    }
    render() {
        console.log("Book.js History: >> ", this.props.history);
        let cat = this.props.category;
        let books = this.props.books[0];
        console.log('books.cat', books, cat);
        return (
            <div className="row">
                <div className=""  >
                    {this.props.match.params.category ? <div className='col-md-3 col-sm-12'>
                        <Categories _push={this.handleChangeCategory} fetch={this.fetchData} /></div>
                        : null}
                    <div className="wrapper-for-books">
                        {books[cat].map((item, index) =>
                            this.renderBooks(item, index))}
                    </div>
                </div>
            </div>
        )
    }
}