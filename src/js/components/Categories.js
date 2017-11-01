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

    render() {
        console.log(this.props.categories)
        return (
            <div className="wrapper">
                {this.props.categories.map((item,i) => {return  <div key={i} onClick={() => this.props.history.push(`/${item}`)}>{item}</div>})}
            </div>
        )
    }
}