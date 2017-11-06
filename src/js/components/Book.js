import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchBooks, addToHistory, changeActiveCategory } from '../actions';

import { withRouter } from 'react-router';
import Slider from './Slider';
import { ORIGIN, ENV_HREF } from '../config';
import { fetchData } from '../functions/fetchData';
import { renderBooks } from '../functions/renderBooks';

const mapStateToProps = (state, ownProps) => {
    return {
        category: state.activeCategory.active,
        books: state.data.filter((item) => { return Object.keys(item)[0] == state.activeCategory.active })
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ fetchBooks, addToHistory, changeActiveCategory }, dispatch);

}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Book extends React.Component {

    constructor(props) {
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.fetchData = fetchData.bind(this);
        this.renderBooks = renderBooks.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    handleClick = (id, item) => {
        this.props.addToHistory(item);
        this.props.history.push(`/book/${id}`);
    }


    cat = this.props.category;
    books = this.props.books[0];
 
    // bookArray = this.props.books[0][this.props.categoryt];


    showMore = () => {
        let startingIndex = this.props.books[0][this.props.category].length;
        console.log('startingIndex', startingIndex, 'this.cat', this.props.category);
        this.fetchData(this.props.category, startingIndex);
    }

    handleChangeCategory(cat) {
        this.forceUpdate();
        this.props.changeActiveCategory(cat);
        this.props.history.push(`/category/${cat}`);
    }
    render() {
        let cat = this.props.category;
        let books = this.props.books[0];
        return (
            <div className="row">
                <div className=""  >
                    {this.props.match.params.category ?
                        <div className='col-md-3 col-sm-12'>
                            <Categories _push={this.handleChangeCategory}
                                fetch={this.fetchData} />
                            <div className="btn-group" data-toggle="buttons">
                                <label className="btn btn-primary active">
                                    <input type="radio" name="options" id="option1" autoComplete="off"/>
                                    Filter by price  </label>
                                <label className="btn btn-primary">
                                    <input type="radio" name="options" id="option2" autoComplete="off" />
                                    Filter by popularity  </label>
                            </div>
                        </div>
                        : null}

                    <div className="wrapper-for-books">
                        {books[cat].map((item, index) =>
                            this.renderBooks(item, index))}

                        <button onClick={this.showMore} type="button" className="col-sm-12 btn btn-default btn-lg">
                            <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span> Show more
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}