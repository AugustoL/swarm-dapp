
//React ,router and history
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute } from "react-router";
import createHashHistory from 'history/lib/createHashHistory';

//Views
import Layout from "./Layout";

import Home from "./views/Home";

//Store
import Store from "./Store";

//CSS
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('../node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.css');
require('../node_modules/bootstrap-material-design/dist/css/ripples.min.css');
require('font-awesome-webpack');
require('./css/all.css');

//Set history
const history = createHashHistory({ queryKey: false });
const app = document.getElementById('app');

//Set router
ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={Layout}>

      <IndexRoute component={Home}></IndexRoute>

      <Route path="/home" name="home" component={Home}></Route>

    </Route>
  </Router>,
app);
