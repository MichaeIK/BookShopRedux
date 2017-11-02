import React from 'react';
import Book from '../components/Book'
import { withRouter } from 'react-router-dom';

@withRouter
export default class Search extends React.Component {

    render() {
    	console.log(this.props)
        return (
            <div className="wrapper">
               Search
               <Book />
                
            </div>
        )
    }
}