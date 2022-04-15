Requirements for Assignment : <br/>
create an ethereum account :  This is completed inside metamask (12 words, create an account, fund with Ropsten ether <br/>
Create an ERC20-compliant, fixed-supply tohken using open zeppelin contract <br/>
Deply to Ropsten : deploying using injected web3 and metamask  <br/>
<br/>
Pre-Requisites: Docker <br/>
Installations: Git Clone: https://github.com/pankhurij/x21109460blockchain.git    <br/>
<br/>
Create .env file at the root directory with following content:            <br/>                                                                                      INFURA_TOKEN= < Infura Project Token >                            <br/>                                                                                           CONTRACT_ADDRESS= < Address of Contract deployed>                 <br/>                                                                                               OWNER_ADDRESS= < Metamask Account ID >                       <br/>                                                                                                   PRIVATE_KEY= < Private from Metamask Account >  <br/>
For reference refer.env file     <br/>  
<br/>
View running docker containers: docker ps   <br/>
Creating Docker Image : docker build -t lablockchain:1.0 <br/>
Run Docker image: docker run lablockchain:1.0   <br/>
start/stop a container: docker start/stop [name]  <br/>
view logs: docker logs [name] <br/>
