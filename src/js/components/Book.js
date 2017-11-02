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
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU`)
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
        }
       
        return (
            <div key={index} className="col-sm-6 col-md-3 book-wrapper" onClick={this.handleClick.bind(null, item.id)}>
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
        console.log(this.props)
        return (
            <div className="">
                <div className='col-md-3 col-sm-12'><Categories /></div>
                {this.props.match ? <div className='col-md-9 col-sm-12'><Slider /></div>
                    : null}
                <div className=" col-sm-12 col-md-9 row wrapper-for-books"  >
                    {this.props.books.map((item, index) =>
                        this.renderBooks(item, index))}
                </div>
            </div>
        )
    }
}