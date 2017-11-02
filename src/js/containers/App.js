import React from 'react';
import Catalog from '../components/Catalog';
import Book from '../components/Book';
import BookView from '../components/BookView';
import Cart from '../components/Cart';
import Favourites from '../components/Favourites';
import MainLayout from '../components/MainLayout';
import Search from '../components/Search';
import Registration from '../components/Registration';


import { Link, Route, Switch } from 'react-router-dom';

import {ENV_HREF} from '../config';

export default class App extends React.Component {


    render() {
        return (
            <div className="wrapper">
                <MainLayout>
                    <Switch>
                        <Route exact path={ENV_HREF} component={Catalog} />
                        <Route path={`${ENV_HREF}category/:category/`} component={Book } />
                        <Route path={`${ENV_HREF}book/:id`} component={BookView} />
                        <Route path={`${ENV_HREF}cart`} component={Cart} />
                        <Route path={`${ENV_HREF}favourites`} component={Favourites} />
                        <Route path={`${ENV_HREF}search`} component={Search} />
                        <Route path={`${ENV_HREF}registration`} component={Registration} />
                        <Route path="*" component={() => <div>Page Not Found</div>}/>
                    </Switch>
                </MainLayout>
                
                    

            </div>
        )
    }
}