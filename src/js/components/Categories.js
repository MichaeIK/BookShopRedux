import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { changeActiveCategory } from '../actions';

const mapStateToProps = (state) => {
    return ({
        categories: state.categories,
        category: state.activeCategory.active,
        data: state.data,
        books: state.data.filter((item) => { return Object.keys(item)[0] == state.activeCategory.active })
    })
};

@withRouter
@connect(mapStateToProps, { changeActiveCategory })
export default class Categories extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            ontop: 500,
        }

    }




    handleChangeCategory = (cat) => {
        let data = this.props.data.filter((item) => Object.keys(item)[0] == cat);
        // console.log(data);
        if (data[0][Object.keys(data[0])[0]].length == 0) {
            this.context.changeCategory("category", cat);
        } else {
            this.props.changeActiveCategory(cat);
            this.props.history.push(`/category/${cat}`);
        }

        // this.props._push(cat);
        // this.props.fetch(cat);
        // // console.log('books length', this.props.books[0][this.props.category])
        // // if (!this.props.books[0][this.props.category].length) {
        // //     console.log('111')
        // //     this.props.fetch(cat);
        // // }

        // this.forceUpdate();
    }


    static contextTypes = {
        changeCategory: PropTypes.func.isRequired,
        // historyPush: PropTypes.func.isRequired,
    }

    render() {
        window.onscroll = (e) => {
            console.dir(document)
            console.log(document.clientHeight)
            if (this.refs.bounding.getBoundingClientRect().top <= 0) {
                this.refs.menue.style.position = 'fixed';
                this.refs.menue.style.top = '50px';
            } else {
                this.refs.menue.style.position = 'relative';
                this.refs.menue.style.top = '';

            }
        }
            return (
                <div ref="bounding">
                    <ul className="menue" ref="menue">
                        {this.props.categories.map((item, i) => {
                            return <li className="categoryMenu" key={i}
                                onClick={this.handleChangeCategory.bind(null, item)}>{item}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }