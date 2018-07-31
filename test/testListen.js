const ReferencedContract = artifacts.require('./ReferencedContract.sol');
const ReferencingContract = artifacts.require('./ReferencingContract.sol');
const UsingReferenceContract = artifacts.require('./UsingReferenceContract.sol');

const chai = require('chai');
const assert = chai.assert;

describe.only("Check referencing contracts", function () {

    it("Should pass if referenced value is increased by one", async () => {
        var emitter = web3.eth.accounts[1];

        let using = await UsingReferenceContract.deployed();
        let referenced = await ReferencedContract.deployed();
        let referencedVal = await referenced.getAmmo();
        let refCall = await using.increaseOnReferenced(1);
        let afterWorkVal = await referenced.getAmmo();
        assert.equal(web3.toBigNumber(referencedVal).toNumber()+1,web3.toBigNumber(afterWorkVal).toNumber());
        


    });

    it("Should point to a new contract and work on it by referencing", async () => {

        let using = await UsingReferenceContract.deployed();
        let referenced = await ReferencedContract.deployed();

        let oldAddress = referenced.address;

        let referencedNew = await ReferencedContract.new();

        let newAddress = referencedNew.address; 

        assert.notEqual(oldAddress,newAddress);

        let referencing = await ReferencingContract.deployed();
        await referencing.changeRef(referencedNew.address);
        
        let referencedVal = await referencedNew.getAmmo();
        let refCall = await using.increaseOnReferenced(10);
        let oldContractVal = await referenced.getAmmo();
        let newContractVal = await referencedNew.getAmmo();
        assert.equal(web3.toBigNumber(referencedVal).toNumber()+10,web3.toBigNumber(newContractVal).toNumber());

        assert.equal(web3.toBigNumber(oldContractVal).toNumber(),web3.toBigNumber(1).toNumber());
        


    })
});