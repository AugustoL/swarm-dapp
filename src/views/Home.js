import React from 'react';
import {Link} from "react-router";

import Store from "../Store";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default class Document extends React.Component {

    constructor() {
      super();

      this.state = {
        loading: false
      };
    }

    goTo(hash){
      window.location.replace(window.location.origin+'/#/'+hash);
    }

    componentWillMount(){
      var self = this;

    }

    render() {
      var self = this;
      return(
        <div>
          { self.state.loading ?
            <Loader />
          :
            <div class="row">
              <div class="col-xs-12 contentBox">
                <Message ref={(c) => self._message = c}/>
                <h1 class="text-center">Test Swarm Dapp</h1>
              </div>
            </div>
          }
        </div>
      );
    }

}
