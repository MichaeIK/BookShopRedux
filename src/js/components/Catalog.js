import React from 'react';
import Categories from './Categories';
import Book from './Book';
import Slider from './Slider';

export default class Catalog extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <Slider />
                <Categories />
                <Book />
            </div>
        )
    }
}