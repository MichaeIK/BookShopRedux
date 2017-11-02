import React from 'react';
import Categories from './Categories';
import Book from './Book';
import Slider from './Slider';

export default class Catalog extends React.Component {

    render() {
        return (
            <div className="wrapper">
                {/* <div className='col-md-9 col-sm-12'><Slider /></div> */}
                
                <Book />
            </div>
        )
    }
}