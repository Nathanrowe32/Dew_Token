//Nathan Rowe
//5/1/2021

var myToken = artifacts.require("DewToken.sol");
var myTokenSale = artifacts.require("DewTokenSale");
var myKycContract = artifacts.require("KycContract");
require("dotenv").config({path: "../.env"});


module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(myToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(myKycContract);
    await deployer.deploy(myTokenSale, 1, addr[0], myToken.address, myKycContract.address);
    let instance = await myToken.deployed();
    await instance.transfer(myTokenSale.address, process.env.INITIAL_TOKENS);
}

