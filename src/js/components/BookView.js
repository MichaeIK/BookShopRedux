import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';


import { addToWishlist, addToHistory, addToCart, fetchBooks, changeActiveCategory } from '../actions';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchData } from '../functions/fetchData';

const mapStateToProps = (state, ownProps) => {

    let isInclude = '';
    for (let i = 0; i < state.data.length; i++) {
        if (!isInclude) {
            for (let key in state.data[i]) {

                // console.log('state.data[i][key]', state.data[i][key], key);
                isInclude = state.data[i][key].find((item) => { return item.id == ownProps.match.params.id })
                // console.log('i', i, isInclude);
            }
        }
    }
    return { book: isInclude }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addToCart, addToWishlist, addToHistory, fetchBooks, changeActiveCategory }, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class BookView extends React.Component {


    constructor(props) {
        // console.log(1111111111111);
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.fetchData = fetchData.bind(this);
    }

    handleChangeCategory(cat) {

        // console.log('Change category?', cat, this.props);
        this.props.changeActiveCategory(cat);
        this.props.history.push(`/category/${cat}`);
        this.forceUpdate();
    }



    handleBuy = () => {
        this.props.addToCart(this.props.book)
    }

    handleWish = () => {
        this.props.addToWishlist(this.props.book)
    }

    // componentWillMount() {
    //     this.props.addToHistory(this.props.book)
    // }


    render() {
        let book = this.props.book
        const url = { backgroundImage: `url(${this.props.book.volumeInfo.imageLinks.thumbnail})` }
        const star = { backgroundImage: 'url(../../assets/img/icons8-star-filled.png)' }
        const heart = { backgroundImage: 'url(../../assets/img/icons8-heart.png)' }
        let author = book.volumeInfo.authors[0];

        return (
            <div className="book-view-wrapper row">
                <div className='col-md-3 col-sm-12'><Categories _push={this.handleChangeCategory} fetch={this.fetchData} /></div>
                <div className='col-md-9 col-sm-12 desc'>
                    <div className="wrapper-for-books">
                        <div className="col-md-6 col-sm-12 book-image" style={url}>
                            <div className="star" style={heart} onClick={this.handleWish}></div>
                        </div>
                        <div className="col-md-6 col-sm-12 about">
                            <div><p><span>Title: </span> {book.volumeInfo.title}</p></div>
                            <div><p><span>Author: </span> {author}</p></div>
                            <div><p><span>Publishing date: </span> {book.volumeInfo.publishedDate}</p></div>
                            <div><p><span>Number of pages: </span> {book.volumeInfo.pageCount}</p></div>
                            <div className='cost'>
                                <p><span>Price: </span> {book.saleInfo.listPrice ? book.saleInfo.listPrice.amount:400} UAH</p>
                                <button className='btn-default btn-bookView' onClick={this.handleBuy}>Buy</button>
                                {book.volumeInfo.previewLink ?
                                    <button className='btn-default btn-bookView' >
                                        <a target="blank" href={book.volumeInfo.previewLink}>Read pasage</a>
                                    </button> : null}
                            </div>
                            <div className='inline' >
                                <div className="star" style={star}></div>
                                <div className="star" style={star}></div>
                                <div className="star" style={star}></div>
                                <div className="star" style={star}></div>
                                <div className="star" style={star}></div>
                            </div>
                            <p><span>Description: </span></p>
                            <p>{book.volumeInfo.description}...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}