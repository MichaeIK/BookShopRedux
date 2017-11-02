import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchBooks } from '../actions';
import {withRouter} from 'react-router';
import Slider from './Slider';




const mapStateToProps = (state, ownProps) => {
    // console.log('state', state);
    // let keyWord = ownProps.match ? ownProps.match.params.category : 'books for developer';
    // console.log('keyWord', keyWord);
    return { books: state.data }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks }, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {

    componentDidMount() {
        // console.log('init', this.props.match.params.category);
        let keyword = this.props.match ? this.props.match.params.category : 'books for developer';
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.props.fetchBooks(res.items);
            })
            .catch(err => console.log(err))
    }

    handleClick = (id) => {
        console.log('click', id, 'this.props.history', this.props.history)
        this.props.history.push(`book/${id}`);
    }

    renderBooks = (item, index) => {
        console.log('item.id', item.id);
        let url = {
            backgroundImage: `url(${item.volumeInfo.imageLinks.smallThumbnail})`
        }
        // console.log(item.volumeInfo)
        return (
            <div key={index} className="col-sm-6 col-md-3 book-wrapper"  onClick={this.handleClick.bind(null, item.id)}>
                <div className="book-card-top">
                    <div className="col-sm-10 book-image" 
                        style={url}></div>
                    <div className="col-sm-2 book-stars"></div>
                </div>
                <div className="book-title">{item.volumeInfo.title}</div>
                <div className="book-pages"></div>
                <div className="book-category"></div>
            </div>
        )
    }

    render() {
        // console.log("Books render: ", this.props);
        return (
            <div className="">

                <div className='col-md-3 col-sm-12'><Categories /></div>
                {this.props.match ?<div className='col-md-9 col-sm-12'><Slider /></div>
 : null}
                
                <div className=" col-sm-12 col-md-9 row wrapper-for-books"  > 
                    {this.props.books.map((item, index) => 
                        this.renderBooks(item, index))}
                </div>

            </div>
        )
    }
}