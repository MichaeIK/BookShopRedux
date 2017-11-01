import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchBooks } from '../actions';



const mapStateToProps = (state, ownProps) => {
    console.log('state', state);
    let keyWord = ownProps.match ? ownProps.match.params.category : 'cats';
    return {books: state.books,
              keyWord: keyWord}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks }, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {

    
    
    renderBooks = () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.keyWord}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.props.fetchBooks(res.items);
            })
            .catch(err => console.log(err))

        return (
            <div className="col-sm-12 col-md-9">
                <div className="book-wrapper">
                    <div className="row">
                        <div className="col-sm-10 book-image"></div>
                        <div className="col-sm-2 book-stars"></div>
                    </div>
                    <div className="book-title"></div>
                    <div className="book-pages"></div>
                    <div className="book-category"></div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="wrapper">
                {this.renderBooks()}
                books
            </div>
        )
    }
}