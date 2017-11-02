import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return { book: state.data.find((item)=> item.id == ownProps.match.params.id ) }

 } 

@connect(mapStateToProps)
export default class BookView extends React.Component {

    render() {
        let book = this.props.book
        let url = {
            backgroundImage: `url(${ this.props.book.volumeInfo.imageLinks.thumbnail})`
        }
        console.log(url)
        const logo = {
            backgroundImage: 'url(../../assets/img/logo.png)'
        }
        return (
            <div className="book-view-wrapper">
                <div className='col-md-3 col-sm-12'><Categories /></div>
                <div className='col-md-9 col-sm-12 desc'>
                    <div className="wrapper-for-books">
                        <div className="col-md-6 col-sm-12 book-image" style={url}></div>
                        <div className="col-md-6 col-sm-12">
                            <button>Read fragment</button>
                            <div>{book.volumeInfo.title}</div>
                            <div>{book.volumeInfo.title}</div>
                            <div>{book.volumeInfo.author}</div>
                            <div>{book.volumeInfo.publishedDate}</div>
                            <div>{book.volumeInfo.pageCount}</div>
                            <div className='cost'>
                                <p>3000 ГРН</p>
                                <div className="star" style={logo}></div>
                                <button className='btn-success'>Regbnm</button>
                            </div>
                            
                            {/* <div> */}
                            
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}