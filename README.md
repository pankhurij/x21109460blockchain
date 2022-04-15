Requirements for Assignment : 
create an ethereum account :  This is completed inside metamask (12 words, create an account, fund with Ropsten ether
Create an ERC20-compliant, fixed-supply tohken using open zeppelin contract
Deply to Ropsten : deploying using injected web3 and metamask
Pre-Requisites: Docker
Installations: Git Clone: https://github.com/pankhurij/x21109460blockchain.git
Create .env file at the root directory with following content:                                                                                                 INFURA_TOKEN= < Infura Project Token >                                                                                                                       CONTRACT_ADDRESS= < Address of Contract deployed>                                                                                                                OWNER_ADDRESS= < Metamask Account ID >                                                                                                                          PRIVATE_KEY= < Private from Metamask Account >  ; For reference refer.env file
View running docker containers: docker ps
Creating Docker Image : docker build -t lablockchain:1.0 
Run Docker image: docker run lablockchain:1.0
start/stop a container: docker start/stop [name]
view logs: docker logs [name]
