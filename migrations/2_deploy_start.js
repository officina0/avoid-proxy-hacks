const ReferencedContract = artifacts.require('./ReferencedContract.sol');
const ReferencingContract = artifacts.require('./ReferencingContract.sol');
const UsingReferenceContract = artifacts.require('./UsingReferenceContract.sol');


module.exports = function(deployer, network, accounts) {

    return deployer
        .then(() => {
            return deployer.deploy(ReferencedContract);
        })
        .then((ReferencedContract) => {
            return deployer.deploy(
                ReferencingContract);
        })
        .then((ReferencingContract) => {
            return ReferencingContract.changeRef(ReferencedContract.address)
            
        })
        .then((response) => {
            return deployer.deploy(
                UsingReferenceContract,
                ReferencingContract.address
            )
        })
     ;
};
