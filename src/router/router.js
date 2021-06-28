import React, {
    createElement,
} from 'react';
import { Switch, Route } from 'react-router-dom';
import routesWithLayout from "./routesWithLayout"
import NotFound from '../components/pages/NotFound'
import NotAuth from '../components/pages/NotAuth'
import {useAuthenticated} from '../context/Auth'

const Router = (props)=> {
    const isAuth =useAuthenticated()
    return (
        <Switch>
            {isAuth ? routesWithLayout.map(child => (
                 child.component && <Route
                        exact
                        key={child.name}
                        path={`/${child.path}`}
                        render={() => createElement(child.component)}
                    />
            )) : <NotAuth /> }
            <Route path="/nonauth">
                <NotAuth />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}
export default Router;
