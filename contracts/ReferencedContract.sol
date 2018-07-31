pragma solidity 0.4.24;
contract ReferencedContract {

    int private amount;

    function increase(int inc) public {
        amount += inc;
    }

    function getAmmo() public constant returns(int) {
        return amount;
    }

   
  

    

}