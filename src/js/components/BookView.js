import React from 'react';
import Categories from './Categories';

export default class BookView extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div className='col-md-3 col-sm-12'><Categories /></div>
                BookView
            </div>
        )
    }
}