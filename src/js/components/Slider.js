import React, { Children } from 'react';


export default class Slider extends React.Component {

    changeSlide = () => {
        if (this.state.index < 3) {
            this.setState({index: this.state.index + 1 });
           
            // console.log('state', this.state);
        } else {
        this.setState({index: 0})
        }
        this.setState({currentSlide: Children.toArray(this.props.children)[this.state.index]})
        
    }
    timer = 0;
    state = ({ index: 1,
                currentSlide: Children.toArray(this.props.children)[0]})

    componentDidUpdate() {
        // console.log('update')
        clearTimeout(this.timer);
        this.timer = setTimeout(this.changeSlide, 2000);
    
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextState, this.state);
        if (this.state.index == nextState.index) {
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.setState({index: 0})
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    render() {
        // console.log(this.state.currentSlide);
        // setTimeout(this.changeSlide, 2000);
        return (
            <div className="slider-container">
                <div className="slider-content">
                    {this.state.currentSlide}
                </div>
            </div>
        )
    }
}