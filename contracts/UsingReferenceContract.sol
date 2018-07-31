import "./ReferencingContract.sol";
import "./ReferencedContract.sol";
pragma solidity 0.4.24;
contract UsingReferenceContract {

    ReferencingContract referencing;

    constructor (address ref) {
        referencing = ReferencingContract(ref);
    }

 


    function increaseOnReferenced(int amount) public {
        address ret = referencing.getRef();
        ReferencedContract referenced = ReferencedContract(ret);
        referenced.increase(amount);
        
       
    }

    

   

    

}