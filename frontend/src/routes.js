import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';


export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Register" exact component={Register} />
                <Route path="/Edit" exact component={Register} />
            </Switch>
        </BrowserRouter>
    );
}
