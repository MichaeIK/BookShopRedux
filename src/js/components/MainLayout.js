import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {PATH} from '../config';
// import pict from ''
// console.log(PATH)
// const x = `.${PATH}heart.png`;
export default class MainLayout extends React.Component {

    render() {
        // console.log(`${PATH}heart.png`)
        return (
            <div className="container">
                <div className="row">
                    <Header />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
                <div className="row">
                    <Footer />
                </div>

                <div style={{backgroundImage: 'url(./assets/img/heart.png)',height:'300px'}}></div>


            </div>
        )
    }
}