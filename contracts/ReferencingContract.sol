import "./Ownable.sol";
pragma solidity 0.4.24;
contract ReferencingContract is Ownable{


    address  referenced;


    function getRef() public view  returns(address){
        return referenced;
    }

//we implement a little security to allow only contract owner to change ref
// for better security chek  openZeppelin ownable pattern.
    function changeRef(address newRef)  public onlyOwner{
        referenced = newRef;
    }

   

    

}