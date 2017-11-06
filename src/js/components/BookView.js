import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';


import { addToWishlist,  addToHistory, addToCart, fetchBooks, changeActiveCategory } from '../actions';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {fetchData} from '../functions/fetchData';

const mapStateToProps = (state, ownProps) => {
    
        let isInclude = '';
        for (let i = 0; i < state.data.length; i++) {
            if (!isInclude) {
                for (let key in state.data[i]) {
    
                    console.log('state.data[i][key]', state.data[i][key], key);
                    isInclude = state.data[i][key].find((item) => { return item.id == ownProps.match.params.id })
                    console.log('i', i, isInclude);
                }
            }
    
            // if (isInclude) return;
    
        }
        console.log(isInclude);
    
    
        return { book: isInclude }
        // return { book: state.data.find((item)=> item.id == ownProps.match.params.id)}
    }


const mapDispatchToProps = (dispatch)=> {
	return bindActionCreators({addToCart, addToWishlist, addToHistory, fetchBooks, changeActiveCategory}, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class BookView extends React.Component {


    constructor(props) {
        console.log(1111111111111);
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.fetchData = fetchData.bind(this);
    }

    handleChangeCategory(cat) {
       
        console.log('Change category?', cat, this.props);
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
        const url = {backgroundImage: `url(${ this.props.book.volumeInfo.imageLinks.thumbnail})`}
        const star = {backgroundImage: 'url(../../assets/img/icons8-star-filled.png)'}
        const heart = {backgroundImage: 'url(../../assets/img/icons8-heart.png)'}       


        return (
            <div className="book-view-wrapper row">
                <div className='col-md-3 col-sm-12'><Categories  _push={this.handleChangeCategory} fetch={this.fetchData}/></div>
                <div className='col-md-9 col-sm-12 desc'>
                    <div className="wrapper-for-books">

                        <div className="col-md-6 col-sm-12 book-image" style={url}>

                        <div className="star" style={heart} onClick={this.handleWish}></div>

                        </div>
                        <div className="col-md-6 col-sm-12">
                            <button>Read fragment</button>
                            <div>{book.volumeInfo.title}</div>
                            <div>{book.volumeInfo.title}</div>
                            <div>{book.volumeInfo.author}</div>
                            <div>{book.volumeInfo.publishedDate}</div>
                            <div>{book.volumeInfo.pageCount}</div>
                            <div className='cost'>
                                <p>3000 ГРН</p>
                                <button className='btn-success' onClick={this.handleBuy}>Buy</button>
                            </div>
                            <div className='inline' >
                                <div className="star" style={star}></div>
                                <div className="star" style={star}></div>
                                <div className="star" style={star}></div>
                                <div className="star" style={star}></div>
                                <div className="star" style={star}></div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}