import React from 'react';
import Categories from './Categories';
import Book from './Book';
import Slider from './Slider';
import { fetchBooks, changeActiveCategory } from '../actions';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';



const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks, changeActiveCategory }, dispatch);
}

@connect(null, mapDispatchToProps)
export default class Catalog extends React.Component {
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

    render() {

        let urls = [
            {
                backgroundImage: 'url(../../assets/img/slider1.JPG)'
            },
            {
                backgroundImage: 'url(../../assets/img/slider2.JPG)'
            },
            {
                backgroundImage: 'url(../../assets/img/slider3.JPG)'
            }
        ];
        return (
            <div className="row">
                 <div className='col-md-3 col-sm-12 categories'><Categories _push={this.handleChangeCategory} fetch={this.fetchData}/></div>
                    <div className='col-md-9 col-sm-12 left-part-wrapper'>
                    <Slider>
                        <div className="slide" style={urls[0]}></div>
                        <div className="slide" style={urls[1]}></div>
                        <div className="slide" style={urls[2]}></div>

                    </Slider>
                    <Book />
                </div>

                
            </div>
        )
    }
}