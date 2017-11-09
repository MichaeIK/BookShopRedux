import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchBooks, addToHistory, addToCart, changeActiveCategory } from '../actions';

import { withRouter } from 'react-router';
import Slider from './Slider';
import { ORIGIN, ENV_HREF } from '../config';
import fetchData from '../functions/fetchData';
import { renderBooks } from '../functions/renderBooks';
import PropTypes from 'prop-types';

const mapStateToProps = (state, ownProps) => {
    return {
        category: state.activeCategory.active,
        data: state.data,
        books: state.data.filter((item) => { return Object.keys(item)[0] == state.activeCategory.active })
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ fetchBooks, addToHistory, addToCart, changeActiveCategory }, dispatch);

}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {

    constructor(props) {
        super(props)
        // this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.fetchData = fetchData.bind(this);
        this.renderBooks = renderBooks.bind(this);
        this.state = {
            dropdown: false,
            sortType: 'popularity'
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log("nextProps >>>>> ", nextProps);
    // }

    componentWillMount() {
        let tempCategory = this.props.data.find((item, i) => Object.keys(item)[0] === "React");
        tempCategory = tempCategory[Object.keys(tempCategory)[0]]
        
        if(this.props.match.url === "/" && tempCategory.length === 0) this.fetchData("React");
        if(this.props.match.url !== "/" && tempCategory.length === 0) {
            this.props.changeActiveCategory(this.props.match.params.category);
            this.fetchData(this.props.match.params.category);
        }

    }

    static contextTypes = {
        changeCategory: PropTypes.func.isRequired,
        fetchData: PropTypes.func.isRequired
    }
    
    handleClick = (id, item) => {
        this.props.addToHistory(item);
        this.props.history.push(`/book/${id}`);
    }

    handleBuy = (item) => {
        this.context.notify();
        this.context.val_fun(`You add "${item.volumeInfo.title}" to the cart`)
        this.props.addToCart(item);
    }

    static contextTypes = {
       notify: PropTypes.func.isRequired,
       val_fun: PropTypes.func.isRequired,
       val: PropTypes.string.isRequired
    };

    cat = this.props.category;
    books = this.props.books[0];

    // bookArray = this.props.books[0][this.props.categoryt];


    showMore = () => {
        let cat = this.props.category !== "search" 
            ? this.props.category
            : this.props.match.params.category;


        let category = this.props.category;

        let startIndex = this.props.books[0][category].length;
        // console.log('startingIndex', startIndex, '\nthis.props', this.props);
        this.fetchData(cat, null, startIndex);
    }

    
    showDropdown = () => {
        this.setState({ dropdown: !this.state.dropdown })
        console.log(this.state.dropdown)
    }

    handleSort = (e) => {
        console.log(e.target.getAttribute('data-sort'));
        this.setState({sortType: e.target.getAttribute('data-sort')});
    }
    sortBooks = (a, b) => {
        let priceA = a.saleInfo.retailPrice ? Math.round(a.saleInfo.retailPrice.amount) : 0;
        let priceB = b.saleInfo.retailPrice ? Math.round(b.saleInfo.retailPrice.amount) : 0;
        let starsA = a.volumeInfo.averageRating ? a.volumeInfo.averageRating : 0;
        let starsB = b.volumeInfo.averageRating ? b.volumeInfo.averageRating : 0;
        switch (this.state.sortType) {
            case 'upPrice':
                return priceB - priceA;
            case 'downPrice':
                return priceA - priceB;
            case 'popularity':
                return starsB - starsA;
            default: return 0;
        }

    }
    render() {
        let cat = this.props.category;
        let books = this.props.books[0];
        return (
            <div className="row">
                <div className="central-wrapper">
                    {this.props.match.params.category ?


                        <div className='col-md-3 col-sm-12'>
                            <Categories/>


                        </div>
                        : null}

                    <div className="wrapper-for-books">
                        <div className="dropdown">
                            <button onClick={this.showDropdown} className='btn btn-primary dropdown-toggle' type="button" data-toggle="dropdown">
                                Сортировка <span className="caret"></span>
                            </button>
                            <ul id="myDropdown"
                                className={!this.state.dropdown ? 'dropdown-content' : 'dropdown-content show'}>
                                <li className="dropdown_li" data-sort="upPrice" onClick={this.handleSort}>от дорогих к дешевым</li>
                                <li className="dropdown_li" data-sort="downPrice" onClick={this.handleSort}>от дешевых к дорогим</li>
                                <li className="dropdown_li" data-sort="popularity" onClick={this.handleSort}>по популярности</li>
                            </ul>
                        </div>

                        {books[cat].sort(this.sortBooks).map((item, index) =>
                            this.renderBooks(item, index))}

                        <button onClick={this.showMore} type="button" className="col-sm-12 btn btn-default btn-lg">
                             Show more ...
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}