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
import { addCategoriesToBookArray } from '../actions';
import { BrowserRouter as Router } from 'react-router-dom';
import { ENV_HREF } from '../config';
import PropTypes from 'prop-types'
import Notify from '../components/Notify';

const mapStateToProps = (state) => {
    return ({ categories: state.categories })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addCategoriesToBookArray }, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {

    state = { notify:false, val: ''}

    componentWillMount() {

        this.props.addCategoriesToBookArray(this.props.categories);

    }

    unmountNotify = () => {
        this.setState({notify: !this.state.notify});
    }

    val = (item) => {
        this.setState({val: item})
    }

    static childContextTypes = {
        notify: PropTypes.func.isRequired,
        val_fun: PropTypes.func.isRequired,
        val: PropTypes.string.isRequired
    }

    getChildContext = () =>({ notify: this.unmountNotify, val_fun: this.val, val: this.state.val});

    render() {
        return (
            <Router>
                <MainLayout>
                    {this.state.notify ? <Notify /> : null}
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
                {/* <App /> */}
            </Router>




        )
    }
}