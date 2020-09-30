import React, {
    createElement,
} from 'react';
import { Switch, Route } from 'react-router-dom';
import routesWithLayout from "./routesWithLayout"

import NotFound from '../components/layout/NotFound'


const Router = (props)=> {
    return (
        <Switch>
            {routesWithLayout.map(child => (
                child.component && <Route
                        exact
                        key={child.name}
                        path={`/${child.path}`}
                        render={() => createElement(child.component)}
                    />
            ))}
            {routesWithLayout.map(child => (
                child.edit && <Route
                    exact
                    key={child.name}
                    path={`/${child.path}/:id/`}
                    render={(props) => createElement(child.edit, props)}
                />
            ))}

            {/*<Route path="/soft">*/}
            {/*    <First />*/}
            {/*</Route>*/}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}
export default Router;
