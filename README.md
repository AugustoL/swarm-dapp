# Swarm Dapp Deployer

## Install

```sh
git clone https://github.com/AugustoL/swarm-dapp --recursive
cd /ETHPrivTestnet/go-ethereum && make all
cd .. && npm install
cd .. && npm install
```

## Important

To run swarm and swarm-deploy actions you need to have an ETHPrivTestnet running, inside ETHPrivTestnet folder there are instructions to do it.

#### Swarm

`npm run swarm`

This command will run a swarm instance, you need to have a geth node running.

#### Swarm App

`npm run swarm-app`

This command will start the swarm app that you can deploy on the blockchain on localhost:8080

#### Swarm App Build

`npm run swarm-build`

This command will make the build of the webapp that will be deployed on the blockchain.

#### Swarm App Deploy

`npm run swarm-deploy`

This command will deploy the app on the blockchain.

### Donations

Bictoin:  1Cf3mkzNicq57hqP9jMEGbTfvtJnMfAKe6

Ethereum: 0x089a9b6915f3ddf987010A0a56045469DBaACB2C
