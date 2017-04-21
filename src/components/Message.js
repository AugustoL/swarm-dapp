
import React from 'react';

export default class Message extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      type: '',
      text: ''
    };
  }

  open(type, text, autoClose){
    var self = this;
    self.setState({open:true, type: type, text: text});
    if (autoClose)
      setTimeout(function(){
        self.close();
      },3000);
  }

  close(){
    this.setState({open:false});
  }

  render() {
    return(
    <div>
      { (this.state.open && this.state.type == 'warning') ?
        <div class="col-xs-12">
          <div class="bs-component">
            <div class="alert alert-dismissible alert-warning">
              <button type="button" class="close" data-dismiss="alert" onClick={()=> this.close()}>×</button>
              <strong>Warning: </strong> {this.state.text}
            </div>
          </div>
        </div>
      : (this.state.open && this.state.type == 'error') ?
        <div class="col-xs-12">
          <div class="bs-component">
            <div class="alert alert-dismissible alert-danger">
              <button type="button" class="close" data-dismiss="alert" onClick={()=> this.close()}>×</button>
              <strong>Error: </strong> {this.state.text}
            </div>
          </div>
      </div>
      : (this.state.open && this.state.type == 'success') ?
        <div class="col-xs-12">
          <div class="bs-component">
            <div class="alert alert-dismissible alert-success">
              <button type="button" class="close" data-dismiss="alert" onClick={()=> this.close()}>×</button>
              <strong>Success: </strong> {this.state.text}
            </div>
          </div>
        </div>
      : (this.state.open && this.state.type == 'info') ?
        <div class="col-xs-12">
          <div class="bs-component">
            <div class="alert alert-dismissible alert-info">
              <button type="button" class="close" data-dismiss="alert" onClick={()=> this.close()}>×</button>
              <strong>Info: </strong> {this.state.text}
            </div>
          </div>
        </div>
      : <div/>
      }
    </div>
  );
  }

}
