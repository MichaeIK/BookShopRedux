import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    return ({ categories: state.categories,
        category: state.activeCategory.active,
        books: state.data.filter((item) => { return Object.keys(item)[0] == state.activeCategory.active }) })
};

@withRouter 
@connect(mapStateToProps)
export default class Categories extends React.Component {

  
    // handleChangeCategory = (cat) => {      
    //     this.props._push(cat);
    //     this.props.fetch(cat);
    //     // console.log('books length', this.props.books[0][this.props.category])
    //     // if (!this.props.books[0][this.props.category].length) {
    //     //     console.log('111')
    //     //     this.props.fetch(cat);
    //     // }
       
    //     this.forceUpdate();
    // }


    static contextTypes = {
        changeCategory: PropTypes.func.isRequired
    }

    render() {
        // console.log(this.context)
        return (
            
            <ul>
                {this.props.categories.map((item,i) => 
                    {return  <li key={i} 
                    onClick={this.context.changeCategory.bind(null, item)}>{item}</li>})}
            </ul>
        )
    }
}