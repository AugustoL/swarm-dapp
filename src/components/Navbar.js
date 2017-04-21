
import React from 'react';
import {Link} from "react-router";

import Message from "../components/Message";
import Store from "../Store";

export default class Navbar extends React.Component {

  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    var self = this;

  }

  goTo(hash){
    window.location.replace(window.location.origin+'/#/'+hash);
    window.location.reload();
  }
  render() {
    var self = this;
    const path = window.location.hash;

    return(
      <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
          <div class="navbar-header">
            <Link class="navbar-brand" to="home">ETHPrivTestnet</Link>
          </div>
        </div>
      </nav>
    );
  }

}
