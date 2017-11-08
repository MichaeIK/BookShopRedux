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
        this.onMouseMove();

    this.state = {
        ontop: 635,
    }
        
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
    onMouseMove (){
        
    }
  //   componentDidUpdate () {
    
  // }
    render() {
        window.onscroll = (e)=>{
            console.dir(this.refs.menue.parentNode.offsetTop+this.refs.menue.parentNode.previousElementSibling.offsetTop)
            console.log(this.state.ontop)
            console.log(this.refs.menue.getBoundingClientRect().top)
            if(this.refs.menue.getBoundingClientRect().top <= 0){
                console.log('fix')
              this.refs.menue.style.position='fixed';  
              this.refs.menue.style.top='50px';  
            } else if (window.scrollY+30 < this.state.ontop){
                console.log('releative')
                this.refs.menue.style.position='relative';
                this.refs.menue.style.top='';

            }
        }
         
        return (
            
            <ul ref="menue">
                {this.props.categories.map((item,i) => 
                    {return  <li key={i} 
                    onClick={this.handleChangeCategory.bind(null, item)}>{item}</li>})}
            </ul>
        )
    }
}