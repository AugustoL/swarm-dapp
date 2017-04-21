
var fs = require('fs');
var child = require('child_process');
var config = require('./config');
var args = process.argv.slice(2);

const BLOCKCHAIN_PATH = (config.blockchainPath == "default") ?
  __dirname+'/ETHPrivTestnet/blockchain'
:
  config.blockchainPath;
  
const IPC_PATH = (config.ipcPath == "default") ?
  __dirname+'/ETHPrivTestnet/blockchain/geth.ipc'
:
  config.ipcPath;
  
const SWARM_PATH = (config.swarmPath == "default") ?
  __dirname+'/ETHPrivTestnet/go-ethereum/build/bin/swarm'
:
  config.swarmPath;
  
const ACCOUNT = (config.blockchainPath == "default") ?
  require(BLOCKCHAIN_PATH+'/accounts').admin.address
:
  config.account;
  
const PASSWORD_PATH = (config.passwordPath == "default") ?
  __dirname+'/ETHPrivTestnet/blockchain/passwords/acc0'
:
  config.passwordPath;
  

const DEBUG = (args.indexOf('--debug') > 0);

function spanwChild(process, args, callback){
  var callbackCalled = false;
  var _spanwChild = child.spawn(process, args);
  _spanwChild.stdout.on('data', function(data){
    console.log(`${data}`);
    if (callback && !callbackCalled){
      callback(data);
      callbackCalled = true;
    }
  });
  _spanwChild.stdin.on('data', function(data){
    console.log(`${data}`);
    if (callback && !callbackCalled){
      callback(data);
      callbackCalled = true;
    }
  });
  _spanwChild.stderr.on('data', function(data) {
    console.log(`${data}`);
    if (callback && !callbackCalled){
      callback(data);
      callbackCalled = true;
    }
  });
  _spanwChild.on('close', function(code) {
    if (DEBUG)
      console.log(`child process exited with code ${code}`);
  });
  _spanwChild.on('exit', function(code) {
    if (DEBUG)
      console.log(`child process exited.`);
  });
}

function deployFile(path){
  var fileAddress = child.execSync(
    SWARM_PATH+' --bzzaccount '+ACCOUNT+' --datadir '+BLOCKCHAIN_PATH+' --ethapi '+IPC_PATH+' up '+path
    , {encoding: 'utf-8'});
  console.log(path+' deployed on:',fileAddress);
  return fileAddress;
}

switch (args[0]) {

  case 'swarm':

    spanwChild(SWARM_PATH, [
      "--datadir="+BLOCKCHAIN_PATH,
      "--ethapi", BLOCKCHAIN_PATH+"/geth.ipc",
      "--bzzaccount", ACCOUNT,
      "--password", PASSWORD_PATH
    ]);

  break;

  case 'swarm-deploy':

    var indexJSAddress = deployFile(__dirname+'/build/index.min.js');
    var indexSource = fs.readFileSync(__dirname+'/build/index.html',{encoding:'utf8'});
    indexSource = indexSource.replace("src=\"index.min.js\"", "src=\"http://localhost:8500/bzz:/"+indexJSAddress.toString()+"\"");
    fs.writeFileSync(__dirname+'/build/index.html', indexSource);
    var indexHtmlAddress = deployFile(__dirname+'/build/index.html');
    console.log("http://localhost:8500/bzz:/"+indexHtmlAddress);

  break;

}
