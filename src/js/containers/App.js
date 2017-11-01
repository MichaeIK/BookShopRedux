import React from 'react';
import Catalog from '../components/Catalog';
import Book from '../components/Book';
import Cart from '../components/Cart';
import Favourites from '../components/Favourites';
import MainLayout from '../components/MainLayout';


import { Link, Route, Switch } from 'react-router-dom';

import {ENV_HREF} from '../config';

export default class App extends React.Component {


    render() {
        return (
            <div className="wrapper">
                <MainLayout>
                    <Switch>
                        <Route exact path={ENV_HREF} component={Catalog} />
                        <Route path={`${ENV_HREF}book:id`} component={Book} />
                        <Route path={`${ENV_HREF}:category`} component={Book } />
                        <Route path={`${ENV_HREF}cart`} component={Cart} />
                        <Route path={`${ENV_HREF}favourites`} component={Favourites} />
                    </Switch>
                </MainLayout>
                
                    

            </div>
        )
    }
}