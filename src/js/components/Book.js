import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchBooks, addToHistory, changeActiveCategory } from '../actions';

import { withRouter } from 'react-router';
import Slider from './Slider';
import { ORIGIN, ENV_HREF } from '../config';
import { fetchData } from '../functions/fetchData';

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


    componentWillReceiveProps(nextProps) {
        // console.log("NP: ", nextProps, "TP", this.props)

        if (this.props.match.params.category !== nextProps.match.params.category) {
            // console.log('!!!!!!!!')
            this.fetchData(nextProps.match.params.category)
        }
    }

    componentWillUpdate() {
        // console.log("UPDATE?")

    }

    componentWillMount() {
        // console.log('this.props.match.params.category from didMount', this.props.match.params.category)
        this.fetchData();

    }

    handleClick = (id, item) => {
        // console.log('click', id)
        this.props.addToHistory(item);

        this.props.history.push(`/book/${id}`);
        // this.forceUpdate();
    }


    cat = this.props.category;
    books = this.props.books[0];
 
    // bookArray = this.props.books[0][this.props.categoryt];


    showMore = () => {
        let startingIndex = this.props.books[0][this.props.category].length;
        console.log('startingIndex', startingIndex, 'this.cat', this.props.category);
        this.fetchData(this.props.category, startingIndex);
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
        // console.log('item', item);
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
        // console.log('Change category?', cat, this.props);
        this.props.changeActiveCategory(cat);
        this.props.history.push(`/category/${cat}`);
    }
    render() {
        // console.log("Book.js History: >> ", this.props.history);
        let cat = this.props.category;
        let books = this.props.books[0];
        // console.log('books.cat', books, cat);
        return (
            <div className="row">
                <div className=""  >
                    {this.props.match.params.category ? <div className='col-md-3 col-sm-12'>
                        <Categories _push={this.handleChangeCategory} fetch={this.fetchData} /></div>
                        : null}
                    <div className="wrapper-for-books">
                        {books[cat].map((item, index) =>
                            this.renderBooks(item, index))}

                        <button  onClick={this.showMore} type="button" className="col-sm-12 btn btn-default btn-lg">
                            <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span> Show more
                        </button>
                        {/* <button onClick={this.showMore} >Show more</button> */}
                    </div>

                </div>
            </div>
        )
    }
}