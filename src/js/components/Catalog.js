import React from 'react';
import Categories from './Categories';
import Book from './Book';
import Slider from './Slider';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }
    handleChangeCategory(cat) {
        console.log('Change category?', cat, this.props)
        this.props.history.push(`/category/${cat}`);
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
                 <div className='col-md-3 col-sm-12 categories'><Categories _push={this.handleChangeCategory} /></div>
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