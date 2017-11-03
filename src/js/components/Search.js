import React from 'react';
import Book from '../components/Book'
import { withRouter } from 'react-router-dom';

@withRouter
export default class Search extends React.Component {

    render() {
    	console.log(this.props)
        return (
            <div className="row">
            <div className='col-md-3 col-sm-12'><Categories /></div>
               <div className='col-md-9 col-sm-12 left-part-wrapper'>
               
               <Book />
           </div>

           
       </div>
        )
    }
}