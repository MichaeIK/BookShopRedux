import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { addToCart, fetchBooks, changeActiveCategory } from '../actions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';


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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addToCart, fetchBooks, changeActiveCategory }, dispatch);
}
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class BookView extends React.Component {


    constructor(props) {
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }


    fetchData = (keyword) => {
        console.log(this.props)
        keyword = keyword ? keyword : this.props.match.params.category ? this.props.match.params.category : 'books for developer';
        console.log('keyword from fetch data', keyword);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=10&startIndex=1&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU`)
            .then(res => res.json())
            .then(res => {
                console.log('res.items from fetchbooks', res.items)
                this.props.fetchBooks(res.items, keyword);
                this.props.changeActiveCategory(keyword);
            })
            .catch(err => console.log(err))
    }

    handleChangeCategory(cat) {
       
        console.log('Change category?', cat, this.props);
        this.props.changeActiveCategory(cat);
        this.props.history.push(`/category/${cat}`);
        this.forceUpdate();
    }



    handleBuy = () => {
        // console.log(this.props.book)
        this.props.addToCart(this.props.book)
    }

    render() {
        let book = this.props.book
        const url = { backgroundImage: `url(${this.props.book.volumeInfo.imageLinks.thumbnail})` }
        const star = { backgroundImage: 'url(../../assets/img/icons8-star-filled.png)' }
        const heart = { backgroundImage: 'url(../../assets/img/icons8-heart.png)' }




        return (
            <div className="book-view-wrapper row">
                <div className='col-md-3 col-sm-12'><Categories  _push={this.handleChangeCategory} fetch={this.fetchData}/></div>
                <div className='col-md-9 col-sm-12 desc'>
                    <div className="wrapper-for-books">

                        <div className="col-md-6 col-sm-12 book-image" style={url}>
                            <div className="star" style={heart}></div>
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