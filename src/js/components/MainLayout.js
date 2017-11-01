import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { PATH } from '../config';
// import pict from ''
// console.log(PATH)
// const x = `.${PATH}heart.png`;


import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {fetchBooks} from '../actions';



const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchBooks}, dispatch);
}
@connect(null, mapDispatchToProps)
export default class MainLayout extends React.Component {

    componentWillMount() {
        this.renderBooks();
    }
    renderBooks = () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q='books for developer'`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.props.fetchBooks(res.items);
            })
            .catch(err => console.log(err))
    }

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

                <div style={{ backgroundImage: 'url(./assets/img/heart.png)', height: '300px' }}></div>


            </div>
        )
    }
}