import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state) => {
    return ({ categories: state.categories,
        category: state.activeCategory.active,
        books: state.data.filter((item) => { return Object.keys(item)[0] == state.activeCategory.active }) })
};

@withRouter 
@connect(mapStateToProps)
export default class Categories extends React.Component {

    constructor(props) {
        super(props)
        
    }
    handleChangeCategory = (cat) => {      
        this.props._push(cat);
        this.props.fetch(cat);
        // console.log('books length', this.props.books[0][this.props.category])
        // if (!this.props.books[0][this.props.category].length) {
        //     console.log('111')
        //     this.props.fetch(cat);
        // }
       
        this.forceUpdate();
    }
    render() {
        // console.log(this.props.categories)
        return (
            
            <ul>
                {this.props.categories.map((item,i) => 
                    {return  <li key={i} 
                    onClick={this.handleChangeCategory.bind(null, item)}>{item}</li>})}
            </ul>
        )
    }
}