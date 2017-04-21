
import React from 'react';
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import QRReader from "./QRReader";

import Store from "../Store";

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

export default class Input extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        value: props.initialValue || '',
        title: props.title || '',
        type: props.type,
        valid: true,
        regex: props.regex || '',
        placeholder: props.placeholder || '',
        showQRVoter: false,
        hidePassword: true
      }
    }

    getValue(){
      return (this.state.value);
    }

    addressValid(address){
      return (Store.web3.isAddress(address));
    }

    textValid(text){
      if (this.state.regex != ''){
        var regex = new RegExp(this.state.regex);
        return regex.test(text);
      } else
        return true;
    }

    clear(){
      this.setState({
        value: '',
        title: props.title || '',
        type: props.type,
        valid: true,
        regex: props.regex || '',
        placeholder: props.placeholder || '',
        showQRVoter: false,
        hidePassword: true
      });
    }

    isValid(){
      if (this.state.value.length == 0)
        return false;
      else
        return this.state.valid;
    }

    render() {
        var self = this;
        switch (self.state.type) {
            case 'address':
                return(
                    <div class={self.state.valid ? "form-group" : "form-group has-error"}>
                        <label>{self.state.title}</label>
                        <QRReader
                            showQR={self.state.showQRVoter}
                            onError={(e) => console.error(e)}
                            onScan={(data) => {
                                self.setState({value: data, showQRVoter: false});
                            }}
                        ></QRReader>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                value={self.state.value}
                                onChange={(event) => self.setState({
                                    value: event.target.value,
                                    valid: self.addressValid(event.target.value)
                                })}
                                placeholder={self.state.placeholder || ''}
                            />
                            {self.state.showQRVoter ?
                                <span
                                    class="input-group-addon cursor-pointer"
                                    onClick={() => self.setState({showQRVoter: false})}
                                >
                                    Close <span class="fa fa-camera"></span>
                                </span>
                            :
                                <span
                                    class="input-group-addon cursor-pointer"
                                    onClick={() => self.setState({showQRVoter: true})}
                                >
                                    Open <span class="fa fa-camera"></span>
                                </span>
                            }
                        </div>
                    </div>
                )
            break;
            case 'account':
                return(
                    <div class={self.state.valid ? "form-group" : "form-group has-error"}>
                        <label>{self.state.title}</label>
                        <QRReader
                            showQR={self.state.showQRVoter}
                            onError={(e) => console.error(e)}
                            onScan={(data) => {
                                self.setState({value: data, showQRVoter: false});
                            }}
                        ></QRReader>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                value={self.state.value}
                                onChange={(event) => self.setState({
                                    value: event.target.value,
                                    valid: self.textValid(event.target.value)
                                })}
                                placeholder={self.state.placeholder || ''}
                            />
                            {self.state.showQRVoter ?
                                <span
                                    class="input-group-addon cursor-pointer"
                                    onClick={() => self.setState({showQRVoter: false})}
                                >
                                    Close <span class="fa fa-camera"></span>
                                </span>
                            :
                                <span
                                    class="input-group-addon cursor-pointer"
                                    onClick={() => self.setState({showQRVoter: true})}
                                >
                                    Open <span class="fa fa-camera"></span>
                                </span>
                            }
                        </div>
                    </div>
                )
            break;
            case 'text':
                return(
                    <div class={self.state.valid ? "form-group" : "form-group has-error"}>
                        <label>{self.state.title}</label>
                        <input
                            type="text"
                            class="form-control"
                            value={self.state.value}
                            onChange={(event) => self.setState({
                                value: event.target.value,
                                valid: self.textValid(event.target.value)
                            })}
                            placeholder={self.state.placeholder || ''}
                        />
                    </div>
                )
            break;
            case 'file':
                return(
                    <div class={self.state.valid ? "form-group file-input" : "form-group has-error"}>
                        <label>{self.state.title}</label>
                        <input
                            type="file"
                            class="form-control"
                            value={self.state.value}
                            onChange={(event) => {
                              var fileName = event.target.files[0].name;
                              console.log('Opening file:',fileName);
                              var reader = new FileReader();
                              reader.onload = (function(theFile) {
                                return function(e) {
                                  var base64 = reader.result.split(',')[1];
                                  var fileData = window.atob(base64);
                                  self.setState({
                                    value: fileData,
                                    title: self.props.title+' - '+fileName,
                                    valid: true
                                  })
                                };
                              })(event.target.files[0]);
                              reader.readAsDataURL(event.target.files[0]);
                            }}
                            placeholder={self.state.placeholder || ''}
                        />
                    </div>
                )
            break;
            case 'password':
                return(
                    <div class={self.state.valid ? "form-group" : "form-group has-error"}>
                        <label>{self.state.title}</label>
                        <div class="input-group">
                            <input
                                type={self.state.hidePassword ? 'password': 'text'}
                                class="form-control"
                                value={self.state.value}
                                onChange={(event) => self.setState({
                                    value: event.target.value,
                                    valid: self.textValid(event.target.value)
                                })}
                                placeholder={self.state.placeholder || ''}
                            />
                            {self.state.hidePassword ?
                                <span
                                    class="input-group-addon cursor-pointer"
                                    onClick={() => self.setState({hidePassword: false})}
                                >
                                    <span class="fa fa-eye"></span>
                                </span>
                            :
                                <span
                                    class="input-group-addon cursor-pointer"
                                    onClick={() => self.setState({hidePassword: true})}
                                >
                                    <span class="fa fa-eye-slash"></span>
                                </span>
                            }
                        </div>
                    </div>
                )
            break;

        }

    }

}
