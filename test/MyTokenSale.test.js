//Nathan Rowe
//5/2/2021

const tokenSale = artifacts.require("DewTokenSale");
const token = artifacts.require("DewToken");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("TokenSale Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in my deployerAccount", async() => {
        let instance = await token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equals(new BN(0));
    });

    it("all tokens should be in the TokenSale Smart Contract by default", async() => {
        let instance = await token.deployed();
        let balanceOfSmartContract = await instance.balanceOf(tokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balanceOfSmartContract).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy tokens", async() => {
        let tokenInstance = await token.deployed();
        let tokenSaleInstance = await tokenSale.deployed();
        let kycInstance = await KycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    });

});

