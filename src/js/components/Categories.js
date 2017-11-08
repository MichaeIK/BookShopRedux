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

    this.state = {
        ontop: 500,
    }
        
    }
    handleChangeCategory = (cat) => {      
        this.props._push(cat);
        this.props.fetch(cat);    
        this.forceUpdate();
    }

    render() {
        window.onscroll = (e)=>{
            console.dir(document)
            console.log(document.clientHeight)
            if(this.refs.bounding.getBoundingClientRect().top <= 0){
              this.refs.menue.style.position='fixed';  
              this.refs.menue.style.top='50px';  
            } else {
                this.refs.menue.style.position ='relative';
                this.refs.menue.style.top ='';

            }
        }
         
        return (
            <div ref="bounding">
                <ul className="menue" ref="menue">
                    {this.props.categories.map((item,i) => 
                        {return  <li key={i} 
                        onClick={this.handleChangeCategory.bind(null, item)}>{item}</li>})}
                </ul>
            </div>
        )
    }
}