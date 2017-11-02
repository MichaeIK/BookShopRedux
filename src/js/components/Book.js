import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchBooks } from '../actions';



const mapStateToProps = (state, ownProps) => {
    // console.log('state', state);
    // let keyWord = ownProps.match ? ownProps.match.params.category : 'books for developer';
    // console.log('keyWord', keyWord);
    return { books: state.data }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks }, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {

    componentDidMount() {
        let keyword = this.props.match ? this.props.match.params.category : 'books for developer';
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.props.fetchBooks(res.items);
            })
            .catch(err => console.log(err))
    }

    renderBooks = (item, index) => {
        console.log('item', item);
        let url = {
            backgroundImage: `url(${item.volumeInfo.imageLinks.smallThumbnail})`
        }
        console.log(item.volumeInfo)
        return (
            <div key={index} className="col-sm-6 col-md-3 book-wrapper">
                <div className="row">
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
        console.log("Books render: ", this.props);
        return (
            <div className="col-sm-12 col-md-9">
                <div className="row wrapper-for-books">
                    ljljl
                    {this.props.books.map((item, index) => 
                        this.renderBooks(item, index))}
                </div>

            </div>
        )
    }
}