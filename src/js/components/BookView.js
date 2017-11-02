import React from 'react';
import Categories from './Categories';

export default class BookView extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div className='col-md-3 col-sm-12'><Categories /></div>
                <div className='col-md-9 col-sm-12 wrapper-for-books'>
                    {console.log(this.props.match.params)}
                    


                </div>
                
            </div>
        )
    }
}