import React from 'react';
import Categories from './Categories';
import Book from './Book';
import Slider from './Slider';
import { fetchBooks, changeActiveCategory } from '../actions';
import { connect } from 'react-redux';
import { PATH, ENV_HREF } from '../config';

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

        return (
            <div className="row">
                <div className="row">
                    <div className='col-md-12 col-sm-12 left-part-wrapper'>
                        <Slider>
                            <img src={`${PATH}Books-banner.png`}/>
                        </Slider>
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