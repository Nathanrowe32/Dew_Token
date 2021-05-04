//Nathan Rowe
//5/1/2021
//OpenZeppelin imports

pragma solidity 0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract DEWToken is ERC20, ERC20Detailed {
    constructor(uint256 initialSupply) ERC20Detailed("DeWayne Enterprise", "DEW", 0) public {
        _mint(msg.sender, initialSupply);
    }
}