import React from 'react';
import Categories from './Categories';
import Book from './Book';
import Slider from './Slider';
import { fetchBooks, changeActiveCategory } from '../actions';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
// import {fetchData} from '../functions/fetchData';

const mapStateToProps = (state) => {
    return {watchedBooks: state.slider}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks, changeActiveCategory }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Catalog extends React.Component {


    render() {
        console.log(this.props.watchedBooks)
        let urlssdfsd
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
                <div className="row">
                    <div className='col-md-12 col-sm-12 left-part-wrapper'>
                        <Slider left = '90' watchedBooks ={this.props.watchedBooks} visibleAmount = '2' widthCarts = '600'/>
                            <div className="slide" style={urls[0]}></div>
                            <div className="slide" style={urls[1]}></div>
                            <div className="slide" style={urls[2]}></div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-12 categories'>
                    <Categories />
                </div>
                
                <Book />
            </div>
        )
    }
}