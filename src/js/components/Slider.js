import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
// import './App.css';

export default class Slider extends React.Component {
    state = {
        left : this.props.left
    };
    sliderInitialize=(someBooks, width, amount)=>{
        width = parseInt(width,10);
        amount = parseInt(amount,10);
        if (someBooks.length-amount<2){
            amount=someBooks.length-2
        }
        let x = width/amount - 10;
        let y = width/amount;
        let h = 1.5*x;
        let iStateLeft = this.props.left;
        this.handleClickRight = () =>{
            if(this.state.left < (iStateLeft)){
                this.setState({left: this.state.left+y})
            }
        };
        this.handleClickLeft = () =>{
            if(this.state.left >= -(someBooks.length-1-amount)*y){
                this.setState({left: this.state.left-y})
            }
        };
        return (
            <div className="footer-slider-wrapper">
                    <div className='slider-block'  style={{width: width+2*iStateLeft +'px', height: h + 'px', left:'20px'}}>
                        <div className="arrowLeft arrow"  style={{height: h + 'px', top:0,width:iStateLeft+'px'}}>
                            <span className='btn btn-left' onClick={this.handleClickLeft}   style={{top:h/2-17+'px', left:iStateLeft/2 + 'px'}}>&#60;</span>
                        </div>
                        <div className='slider-inline' style={{left: this.state.left+'px'}}>
                            {someBooks.map((item, index) => {
                                return(
                                    <div className='link' key={index}><img src={item.img}  style={{width: x +'px', height: h + 'px'}} /></div>
                                )
                            } )}
                        </div>
                        <div className="arrowRight arrow"  style={{height: h + 'px', top:0,width:iStateLeft+'px'}}>
                            <span className='btn btn-right' onClick={this.handleClickRight}   style={{top:h/2-17+'px', right:iStateLeft/2 + 'px'}}>&#62;</span>
                        </div>
                    </div>
            </div>)
    };
    render () {
        return(
            this.sliderInitialize.call(this,this.props.watchedBooks, this.props.widthCarts, this.props.visibleAmount)
        )
    }
}










// import React, { Children } from 'react';


// export default class Slider extends React.Component {

//     changeSlide = () => {
//         if (this.state.index < 2) {
//             this.setState({index: this.state.index + 1 });
           
//             // console.log('state', this.state);
//         } else {
//         this.setState({index: 0})
//         }
//         this.setState({currentSlide: Children.toArray(this.props.children)[this.state.index]})
        
//     }
//     timer = 0;
//     state = ({ index: 1,
//                 currentSlide: Children.toArray(this.props.children)[0]})

//     componentDidUpdate() {
//         // console.log('update')
//         clearTimeout(this.timer);
//         this.timer = setTimeout(this.changeSlide, 2000);
    
//     }
//     shouldComponentUpdate(nextProps, nextState) {
//         // console.log(nextState, this.state);
//         if (this.state.index == nextState.index) {
//             return false;
//         }
//         return true;
//     }

//     componentDidMount() {
//         this.setState({index: 0})
//     }

//     componentWillUnmount() {
//         clearTimeout(this.timer);
//     }
//     render() {
//         // console.log(this.state.currentSlide);
//         // setTimeout(this.changeSlide, 2000);
//         return (
//             <div className="slider-container">
//                     {this.state.currentSlide}
//             </div>
//         )
//     }
// }