import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';


const mapStateToProps = (state) => {
    return ({ categories: state.categories })
};

@withRouter 
@connect(mapStateToProps)
export default class Categories extends React.Component {

    constructor(props) {
        super(props)
        
    }
    handleChangeCategory = (cat) => {
        console.log('````', this);
        
        this.props._push(cat);
        this.props.fetch(cat);
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