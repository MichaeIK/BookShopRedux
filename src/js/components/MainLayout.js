import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { PATH } from '../config';
import Favicon from 'react-favicon';
// import pict from ''
// console.log(PATH)
// const x = `.${PATH}heart.png`;


import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';

export default class MainLayout extends React.Component {

    

    render() {
        // console.log(`${PATH}heart.png`)
        let url = 'assets/img/logo.png';
        return (
            <div className="container">
                <Favicon url={[url]}/>
                <div className="row">
                    <Header />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
                <div className="row">
                    <Footer />
                </div>

               


            </div>
        )
    }
}