import React from 'react';
import Catalog from '../components/Catalog';
import Book from '../components/Book';
import BookView from '../components/BookView';
import Cart from '../components/Cart';
import Favourites from '../components/Favourites';
import MainLayout from '../components/MainLayout';
import Search from '../components/Search';
import Registration from '../components/Registration';
import Account from '../components/Account';
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { addCategoriesToBookArray, changeActiveCategory, fetchBooks } from '../actions';
import { withRouter } from 'react-router-dom';
import { ENV_HREF } from '../config';
import fetchData from '../functions/fetchData';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    return ({ categories: state.categories, data: state.data, category: state.category })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addCategoriesToBookArray, changeActiveCategory, fetchBooks }, dispatch);
}
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.fetchData = fetchData.bind(this);
    }

    componentWillMount() {
        this.props.addCategoriesToBookArray(this.props.categories);
    }

    handleChangeCategory = (category, data, stop_fetch) => {
        console.log("! >>>>>> ", category, data, stop_fetch)
        stop_fetch ? this.fetchData(category, data) : this.fetchData(data);
        this.props.changeActiveCategory(data);        
        this.props.history.push(`/${category}/${data}`);
    }

    getChildContext() {
        let self = this;
        return {
            changeCategory: self.handleChangeCategory,
            fetchData: self.fetchData,
            historyPush: self.props.history.push
        };
    }

    static childContextTypes = {
        changeCategory: PropTypes.func.isRequired,
        fetchData: PropTypes.func.isRequired,
        historyPush: PropTypes.func.isRequired
    }

    render() {
        return (
            <MainLayout>
                <Switch>
                    <Route exact path={ENV_HREF} component={Catalog} />
                    <Route path={`${ENV_HREF}category/:category/`} component={Book} />
                    <Route path={`${ENV_HREF}book/:id`} component={BookView} />
                    <Route path={`${ENV_HREF}cart`} component={Cart} />
                    <Route path={`${ENV_HREF}favourites`} component={Favourites} />
                    <Route path={`${ENV_HREF}search/:category/`} component={Book} />
                    <Route path={`${ENV_HREF}registration`} component={Registration} />
                    <Route path={`${ENV_HREF}account/:category/`} component={Account} />
                    {/* <Route path="*" component={() => <div>Page Not Found</div>} /> */}
                </Switch>
            </MainLayout>
        )
    }
}